from django.http import JsonResponse
from rest_framework.decorators import api_view
import os
import google.generativeai as genai

@api_view(['POST'])
def pytutor_chat(request):
    user_input = request.data.get('message', '').strip()
    if not user_input:
        return JsonResponse({"error": "No input provided"}, status=400)

    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        return JsonResponse({"error": "GEMINI_API_KEY not set in environment"}, status=500)

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(user_input)

        reply_text = getattr(response, 'text', None)
        if not reply_text:
            try:
                reply_text = response.candidates[0].content.parts[0].text
            except Exception:
                reply_text = "I couldn't generate a response. Please try again."

        return JsonResponse({"reply": reply_text})

    except Exception as e:
        # Log the error to console for debugging
        print("Error in pytutor_chat:", str(e))
        return JsonResponse({"error": str(e)}, status=500)
