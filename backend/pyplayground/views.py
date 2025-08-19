from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from django.views.decorators.csrf import csrf_exempt,ensure_csrf_cookie
from django.http import JsonResponse
from django.db import IntegrityError
import json

# ✅ SIGNUP API
@csrf_exempt
def signup_user(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Only POST requests allowed'}, status=405)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'status': 'success', 'message': 'User created successfully'})

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    except IntegrityError:
        return JsonResponse({'status': 'error', 'message': 'Username or email already exists'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


# ✅ LOGIN API
@ensure_csrf_cookie
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Only POST requests allowed'}, status=405)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'status': 'error', 'message': 'Username and password required'}, status=400)

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'status': 'success', 'username': user.username, 'user_id': user.id})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)


# ✅ LOGOUT API
@ensure_csrf_cookie
def logout_user(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Only POST requests allowed'}, status=405)

    try:
        logout(request)
        return JsonResponse({'status': 'success', 'message': 'Logged out'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
