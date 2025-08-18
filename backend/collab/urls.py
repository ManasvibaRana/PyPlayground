from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf),
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),

    # JOIN FLOW
    path('projects/<int:project_id>/join/', views.join_project, name='join-project'),  # if you keep direct join
    path('projects/<int:project_id>/request_join/', views.request_join_project, name='request-join'),

    # ✅ NEW: list all join requests for a project (owner only)
    path('projects/<int:project_id>/requests/', views.list_project_join_requests, name='project-join-requests'),

    # CHAT
    path('projects/<int:project_id>/chat/', views.project_chat, name='project-chat'),

    # CURRENT USER
    path('current_user/', views.current_user, name='current-user'),

    # RESPOND + MESSAGES ON JOIN REQUEST
    path('join_requests/<int:request_id>/respond/', views.respond_join_request, name='respond-join-request'),
    path('join_requests/<int:request_id>/messages/', views.get_join_request_messages, name='get-join-request-messages'),
    path('join_requests/<int:request_id>/messages/send/', views.send_join_request_message, name='send-join-request-message'),
]
