import cv2
import base64
import numpy as np
from ultralytics import YOLO
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Load YOLO model globally once
model = YOLO("yolov8n-pose.pt")

def to_python(val):
    """Convert numpy types to native Python."""
    if isinstance(val, (np.generic,)):
        return val.item()
    return val

@csrf_exempt
def recognize_hand_live(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    frame_file = request.FILES.get("frame")
    if not frame_file:
        return JsonResponse({"error": "No frame received"}, status=400)

    # Decode uploaded image
    file_bytes = np.frombuffer(frame_file.read(), np.uint8)
    frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Run YOLO Pose detection
    results = model(frame)
    hand_y = None
    message = "No hand detected"

    for r in results:
        if r.keypoints is not None:
            kps = r.keypoints.xy.cpu().numpy()
            if len(kps) > 0:
                # wrist_y = y coordinate of wrist
                wrist_y = kps[0][0][1]
                hand_y = wrist_y / frame.shape[0]  # normalize 0–1
                message = "Hand detected"

                # Draw keypoints
                for (x, y) in kps[0]:
                    cv2.circle(frame, (int(x), int(y)), 5, (0, 255, 0), -1)

    # Encode frame back to base64
    _, buffer = cv2.imencode(".jpg", frame)
    frame_base64 = base64.b64encode(buffer).decode("utf-8")

    return JsonResponse({
        "frame": frame_base64,
        "hand": {"y": to_python(hand_y)} if hand_y is not None else None,
        "message": message,
    })
