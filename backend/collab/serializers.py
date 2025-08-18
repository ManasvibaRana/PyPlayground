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


class ProjectDetailsSerializer(ProjectSerializer):
    members = ProjectMemberSerializer(many=True, read_only=True)

    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['members']