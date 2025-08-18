from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Project, ProjectMember, ProjectJoinRequest, ProjectMessage

User = get_user_model()


# Mini User Serializer
class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


# Project Member Serializer
class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)

    class Meta:
        model = ProjectMember
        fields = ['id', 'project_id', 'user', 'role', 'joined_at']


# Project Serializer (list + create)
class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserMiniSerializer(read_only=True)
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'tech_stack', 'looking_for',
            'created_by', 'created_at', 'member_count'
        ]
        read_only_fields = ['created_by', 'created_at']

    def get_member_count(self, obj):
        return ProjectMember.objects.filter(project=obj).count()

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        project = Project.objects.create(**validated_data)
        # Owner auto-added
        ProjectMember.objects.create(
            project=project,
            user=project.created_by,
            role='owner'
        )
        return project


# Join Request Serializer
class JoinRequestSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)

    class Meta:
        model = ProjectJoinRequest
        fields = ('id', 'user', 'message', 'status', 'requested_at', 'responded_at')


# Project Message Serializer
class ProjectMessageSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(source='sender', read_only=True)

    class Meta:
        model = ProjectMessage
        fields = ('id', 'message', 'created_at', 'user')


# Project Detail Serializer
class ProjectDetailsSerializer(serializers.ModelSerializer):
    created_by = UserMiniSerializer(read_only=True)
    members = ProjectMemberSerializer(many=True, read_only=True)
    join_requests = JoinRequestSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField()
    is_member = serializers.SerializerMethodField()
    has_pending_request = serializers.SerializerMethodField()
    pending_request_id = serializers.SerializerMethodField()   # 👈 NEW

    class Meta:
        model = Project
        fields = (
            'id', 'title', 'description', 'created_at', 'created_by',
            'member_count', 'is_member', 'has_pending_request',
            'pending_request_id',    # 👈 include it here
            'tech_stack', 'looking_for',
            'members', 'join_requests',
        )

    def get_member_count(self, obj):
        return ProjectMember.objects.filter(project=obj).count()

    def get_is_member(self, obj):
        user = self.context['request'].user
        return ProjectMember.objects.filter(project=obj, user=user).exists()

    def get_has_pending_request(self, obj):
        user = self.context['request'].user
        return ProjectJoinRequest.objects.filter(
            project=obj, user=user, status='pending'
        ).exists()

    def get_pending_request_id(self, obj):
        user = self.context['request'].user
        jr = ProjectJoinRequest.objects.filter(
            project=obj, user=user, status='pending'
        ).first()
        return jr.id if jr else None
