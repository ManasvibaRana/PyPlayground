# Django REST Framework Views Reference
# Place this in your Django app's views.py file

from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ProjectJoinRequest, ProjectMessage, Project, ProjectMember
from .serializers import ProjectSerializer, ProjectDetailsSerializer, ProjectMessageSerializer , JoinRequestSerializer


from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

class ProjectListCreateView(generics.ListCreateAPIView):
    """
    GET /projects/ - List all projects
    POST /projects/ - Create new project
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Project.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                title__icontains=search
            ) | queryset.filter(
                description__icontains=search
            )
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """
    GET /projects/{id}/ - Get project details with members
    """
    queryset = Project.objects.all()
    serializer_class = ProjectDetailsSerializer
    permission_classes = [IsAuthenticated]




# Request to join
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_join_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    user = request.user
    message = request.data.get('message', '')

    if ProjectMember.objects.filter(project=project, user=user).exists():
        return Response({'success': False, 'message': 'You are already a member'}, status=400)

    join_request, created = ProjectJoinRequest.objects.get_or_create(
        project=project,
        user=user,
        defaults={'message': message}
    )

    if not created:
        return Response({'success': False, 'message': 'You already requested to join'}, status=400)

    return Response({'success': True, 'message': 'Join request sent', 'request_id': join_request.id}, status=201)

# Owner approves/rejects
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def respond_join_request(request, request_id):
    join_request = get_object_or_404(ProjectJoinRequest, id=request_id)
    user = request.user
    action = request.data.get('action')  # 'accept' or 'reject'

    if join_request.project.created_by != user:
        return Response({'success': False, 'message': 'Only project owner can respond'}, status=403)

    if join_request.status != 'pending':
        return Response({'success': False, 'message': 'Request already responded'}, status=400)

    if action == 'accept':
        join_request.status = 'accepted'
        ProjectMember.objects.create(project=join_request.project, user=join_request.user)
    elif action == 'reject':
        join_request.status = 'rejected'
    else:
        return Response({'success': False, 'message': 'Invalid action'}, status=400)

    join_request.responded_at = timezone.now()
    join_request.save()
    return Response({'success': True, 'message': f'Request {action}ed'})

# Chat between requester and owner
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_join_request_message(request, request_id):
    join_request = get_object_or_404(ProjectJoinRequest, id=request_id)
    user = request.user
    message_text = request.data.get('message', '').strip()

    if not message_text:
        return Response({'success': False, 'message': 'Message cannot be empty'}, status=400)

    if user != join_request.user and user != join_request.project.created_by:
        return Response({'success': False, 'message': 'Not allowed'}, status=403)

    msg = ProjectMessage.objects.create(join_request=join_request, sender=user, message=message_text)
    serializer = ProjectMessageSerializer(msg)
    return Response(serializer.data, status=201)

# Get messages for a request
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_join_request_messages(request, request_id):
    join_request = get_object_or_404(ProjectJoinRequest, id=request_id)
    user = request.user
    if user != join_request.user and user != join_request.project.created_by:
        return Response({'success': False, 'message': 'Not allowed'}, status=403)

    messages = join_request.messages.all()
    serializer = ProjectMessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_chat(request, project_id):
    project = get_object_or_404(Project, id=project_id)

    # GET messages
    if request.method == 'GET':
        messages = project.messages.all().order_by('created_at')
        serializer = ProjectMessageSerializer(messages, many=True)
        return Response(serializer.data)

    # POST message
    if request.method == 'POST':
        message_text = request.data.get('message', '').strip()
        if not message_text:
            return Response({'success': False, 'message': 'Message cannot be empty'}, status=400)
        
        msg = ProjectMessage.objects.create(project=project, sender=request.user, message=message_text)
        serializer = ProjectMessageSerializer(msg)
        return Response(serializer.data, status=201)
    


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_project_join_requests(request, project_id):
    """
    GET /projects/{id}/requests/ - Owner can see all join requests for this project
    """
    project = get_object_or_404(Project, id=project_id)
    if request.user != project.created_by:
        return Response({'detail': 'Forbidden'}, status=403)
    
    qs = ProjectJoinRequest.objects.filter(project=project).order_by('-requested_at')
    serializer = JoinRequestSerializer(qs, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_chat(request, project_id):
    """
    Group chat: 
    - Only approved members can see/post messages.
    - Pending join requests cannot see messages until accepted.
    """
    project = get_object_or_404(Project, id=project_id)
    user = request.user

    # Check membership status
    membership = ProjectMember.objects.filter(project=project, user=user).first()
    if not membership:
        return Response({'detail': 'You must be a project member to access chat'}, status=403)

    # GET messages
    if request.method == 'GET':
        messages = project.messages.all().order_by('created_at')
        serializer = ProjectMessageSerializer(messages, many=True)
        return Response(serializer.data)

    # POST message
    if request.method == 'POST':
        message_text = request.data.get('message', '').strip()
        if not message_text:
            return Response({'success': False, 'message': 'Message cannot be empty'}, status=400)
        
        msg = ProjectMessage.objects.create(project=project, sender=user, message=message_text)
        serializer = ProjectMessageSerializer(msg)
        return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_join_request_messages(request, request_id):
    """
    Private 1:1 chat for join request:
    - Only requester and owner can see messages.
    - Used before being accepted into group chat.
    """
    join_request = get_object_or_404(ProjectJoinRequest, id=request_id)
    user = request.user

    if user != join_request.user and user != join_request.project.created_by:
        return Response({'success': False, 'message': 'Not allowed'}, status=403)

    messages = join_request.messages.all().order_by('created_at')
    serializer = ProjectMessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_chat(request, project_id):
    """
    Group chat:
    - Only approved members can see/post messages.
    - Pending join requests cannot see messages until accepted.
    """
    project = get_object_or_404(Project, id=project_id)
    user = request.user

    # Check if user is member
    membership = ProjectMember.objects.filter(project=project, user=user).first()
    if not membership:
        return Response({
            'detail': 'You are not a member yet. '
                      'Use join request chat until accepted.'
        }, status=403)

    # ✅ Members only: fetch or send group chat messages
    if request.method == 'GET':
        messages = project.messages.filter(join_request__isnull=True).order_by('created_at')
        serializer = ProjectMessageSerializer(messages, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        message_text = request.data.get('message', '').strip()
        if not message_text:
            return Response({'success': False, 'message': 'Message cannot be empty'}, status=400)

        msg = ProjectMessage.objects.create(project=project, sender=user, message=message_text)
        serializer = ProjectMessageSerializer(msg)
        return Response(serializer.data, status=201)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def join_request_chat(request, request_id):
    """
    Private chat for join request:
    - Only requester and project owner can send/see these messages.
    - Lets requester talk to admin before being accepted.
    """
    join_request = get_object_or_404(ProjectJoinRequest, id=request_id)
    user = request.user

    # Permission check
    if user != join_request.user and user != join_request.project.created_by:
        return Response({'detail': 'Not allowed'}, status=403)

    if request.method == 'GET':
        messages = join_request.messages.all().order_by('created_at')
        serializer = ProjectMessageSerializer(messages, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        message_text = request.data.get('message', '').strip()
        if not message_text:
            return Response({'success': False, 'message': 'Message cannot be empty'}, status=400)

        msg = ProjectMessage.objects.create(
            join_request=join_request,
            sender=user,
            message=message_text
        )
        serializer = ProjectMessageSerializer(msg)
        return Response(serializer.data, status=201)
