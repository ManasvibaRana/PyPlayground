from django.urls import path

from .views import objectdetaction

urlpatterns = [
     path('',objectdetaction)
]
