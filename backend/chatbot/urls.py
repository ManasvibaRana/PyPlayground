from django.urls import path
from . import views

urlpatterns = [
    path('pytutor/', views.pytutor_chat, name='pytutor_chat'),
    path('', views.pytutor_chat, name='chatbot_root'),
]
