import base64
import cv2
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import io
from PIL import Image
from ultralytics import YOLO
import json

# Load YOLO model once
model = YOLO("yolov8n.pt")  # Make sure this path is correct

@csrf_exempt
def objectdetaction(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            img_data = body.get("image")

            # remove base64 header if exists
            if "," in img_data:
                img_data = img_data.split(",")[1]

            # Decode base64 to bytes
            img_bytes = base64.b64decode(img_data)
            img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
            img = np.array(img)  # Convert to numpy array
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

            # Run YOLO detection
            results = model(img)[0]

            predictions = []
            for box, cls in zip(results.boxes.xyxy, results.boxes.cls):
                x1, y1, x2, y2 = box
                predictions.append({
                    "x": int(x1),
                    "y": int(y1),
                    "width": int(x2 - x1),
                    "height": int(y2 - y1),
                    "label": model.names[int(cls)]
                })

            return JsonResponse({"predictions": predictions})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
