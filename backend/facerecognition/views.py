import os
import json
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import face_recognition


class UploadFaceView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    KNOWN_FACES = []

    def post(self, request):
        name = request.data.get('name')
        images = request.FILES.getlist('images')

        if not name:
            return Response({"error": "Name is required."}, status=400)
        if not images:
            return Response({"error": "At least one image is required."}, status=400)

        valid_encodings = []

        for img in images:
            image = face_recognition.load_image_file(img)
            encodings = face_recognition.face_encodings(image)

            if len(encodings) != 1:
                continue

            valid_encodings.append(encodings[0])

        if not valid_encodings:
            return Response({"error": "No valid face found."}, status=400)

        reference_encoding = valid_encodings[0]
        for encoding in valid_encodings[1:]:
            match = face_recognition.compare_faces([reference_encoding], encoding)
            if not match[0]:
                return Response({"error": "Images must be of same person."}, status=400)

        # Store in memory
        self.KNOWN_FACES.append({
            "name": name,
            "encoding": reference_encoding.tolist()
        })

        return Response({"message": "Training done!"})


class LiveRecognizeView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        frame = request.FILES.get('frame')
        if not frame:
            return Response({"error": "Frame is required."}, status=400)

        image = face_recognition.load_image_file(frame)
        face_locations = face_recognition.face_locations(image)

        if not face_locations:
            return Response({"faces": []})

        faces = []
        for location in face_locations:
            encoding_list = face_recognition.face_encodings(image, [location])
            name = "Unknown"

            if encoding_list:
                encoding = encoding_list[0]
                for known in UploadFaceView.KNOWN_FACES:
                    known_encoding = np.array(known['encoding'])
                    match = face_recognition.compare_faces([known_encoding], encoding)
                    if match[0]:
                        name = known['name']
                        break

            top, right, bottom, left = location
            faces.append({
                "name": name,
                "top": top,
                "right": right,
                "bottom": bottom,
                "left": left
            })

        return Response({"faces": faces})


class ClearFacesView(APIView):
    def post(self, request):
        UploadFaceView.KNOWN_FACES = []
        return Response({"message": "Known faces cleared."})
