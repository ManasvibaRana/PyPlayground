# Django REST Framework Serializers Reference
# Place this in your Django app's serializers.py file

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, ProjectMember


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ProjectMember
        fields = ['id', 'project_id', 'user', 'role', 'joined_at']


class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    member_count = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'tech_stack', 'looking_for', 
                 'created_by', 'created_at', 'member_count']
        read_only_fields = ['created_by', 'created_at']

    def create(self, validated_data):
        # Set the created_by field to the current user
        validated_data['created_by'] = self.context['request'].user
        project = Project.objects.create(**validated_data)
        
        # Automatically add the creator as owner
        ProjectMember.objects.create(
            project=project,
            user=project.created_by,
            role='owner'
        )
        
        return project





from rest_framework import serializers
from .models import ProjectJoinRequest, ProjectMessage

class ProjectJoinRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ProjectJoinRequest
        fields = ['id', 'project', 'user', 'message', 'status', 'requested_at', 'responded_at']

        
class ProjectMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = ProjectMessage
        fields = ['id', 'project', 'sender', 'sender_username', 'message', 'created_at']



class ProjectDetailsSerializer(ProjectSerializer):
    members = ProjectMemberSerializer(many=True, read_only=True)
    join_requests = ProjectJoinRequestSerializer(many=True, read_only=True)

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['members', 'join_requests']
