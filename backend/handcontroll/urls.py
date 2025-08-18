from django.urls import path
from .views import recognize_hand_live

urlpatterns = [
 
    path('recognize_live/', recognize_hand_live),
]