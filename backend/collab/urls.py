# Django URLs Reference
# Place this in your Django app's urls.py file

from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf),
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/<int:project_id>/join/', views.join_project, name='join-project'),
    path('projects/<int:project_id>/request_join/', views.request_join_project, name='request-join'),
    path('projects/<int:project_id>/chat/', views.project_chat, name='project-chat'),

    path('join_requests/<int:request_id>/respond/', views.respond_join_request, name='respond-join-request'),
    path('join_requests/<int:request_id>/messages/', views.get_join_request_messages, name='get-join-request-messages'),
    path('join_requests/<int:request_id>/messages/send/', views.send_join_request_message, name='send-join-request-message'),

]