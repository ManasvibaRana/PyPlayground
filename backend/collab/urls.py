# Django URLs Reference
# Place this in your Django app's urls.py file

from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf),
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/<int:project_id>/join/', views.join_project, name='join-project'),
]