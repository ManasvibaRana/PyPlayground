# deep_face/views.py
import base64
import cv2
import numpy as np
from fer import FER
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

detector = FER(mtcnn=True)  # MTCNN for accurate face detection

@csrf_exempt
def detect_emotion(request):
    if request.method == "POST":
        data = json.loads(request.body)
        img_data = data.get("image")

        # Decode base64 image
        img_bytes = base64.b64decode(img_data.split(",")[1])
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect emotions
        results = detector.detect_emotions(img)

        # Simplify the response
        predictions = []
        for face in results:
            predictions.append({
                "box": face["box"],  # x, y, w, h
                "emotions": max(face["emotions"], key=face["emotions"].get)
            })

        return JsonResponse({"status": "ok", "predictions": predictions})
    
    return JsonResponse({"status": "error", "message": "Invalid request"})
