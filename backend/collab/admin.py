from django.contrib import admin

# Register your models here.
from .models import Project,ProjectMember,ProjectJoinRequest,ProjectMessage

admin.site.register(Project)
admin.site.register(ProjectMember)
admin.site.register(ProjectMessage)
admin.site.register(ProjectJoinRequest)