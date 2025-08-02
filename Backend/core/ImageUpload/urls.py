from django.urls import path
from .views import PlantHealthReportAPIView  # or PlantHealthReportListCreateView

urlpatterns = [
    path('plant-health/', PlantHealthReportAPIView.as_view(), name='plant-health'),  # or .as_view() of other view
]
