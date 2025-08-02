from django.urls import path
from .views import SchemeAPIView  # or SchemeListCreateView

urlpatterns = [
    path('scheme/', SchemeAPIView.as_view(), name='scheme-list-create'),  # or SchemeListCreateView
]
