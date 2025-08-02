from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PlantHealthReport
from .serializers import PlantHealthReportSerializer

class PlantHealthReportAPIView(APIView):
    def get(self, request):
        reports = PlantHealthReport.objects.all().order_by('-created_at')
        serializer = PlantHealthReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PlantHealthReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
