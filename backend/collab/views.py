# Django REST Framework Views Reference
# Place this in your Django app's views.py file

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Project, ProjectMember
from .serializers import ProjectSerializer, ProjectDetailsSerializer


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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_project(request, project_id):
    """
    POST /projects/{id}/join/ - Join a project
    """
    project = get_object_or_404(Project, id=project_id)
    user = request.user

    # Check if user is already a member
    if ProjectMember.objects.filter(project=project, user=user).exists():
        return Response(
            {'success': False, 'message': 'You are already a member of this project'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    # Add user as member
    ProjectMember.objects.create(
        project=project,
        user=user,
        role='member'
    )

    return Response(
        {'success': True, 'message': 'Successfully joined the project!'}, 
        status=status.HTTP_201_CREATED
    )