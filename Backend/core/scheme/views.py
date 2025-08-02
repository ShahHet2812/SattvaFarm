from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Scheme
from .serializers import SchemeSerializer

class SchemeAPIView(APIView):
    def get(self, request):
        schemes = Scheme.objects.all().order_by('-id')
        serializer = SchemeSerializer(schemes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SchemeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
