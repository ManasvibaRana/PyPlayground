from django.urls import path
from .views import UploadFaceView, LiveRecognizeView

urlpatterns = [
    path('upload/', UploadFaceView.as_view()),
    path('recognize_live/', LiveRecognizeView.as_view()),
]