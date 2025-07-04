from .models import Users
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = Users.objects.get(username=username)
        
        if user.password == password:  # 🚨 plain-text password check — not secure
            return Response({"status": "success", "username": user.username})
        else:
            return Response({"status": "error", "message": "Incorrect password"})
    
    except Users.DoesNotExist:
        return Response({"status": "error", "message": "User not found"})



@csrf_exempt
def signup_user(request):
 if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if Users.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)

        user = Users(username=username, email=email, password=password)
        user.save()

        return JsonResponse({'status': 'success', 'message': 'User created successfully'})