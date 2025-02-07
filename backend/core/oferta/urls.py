from django.urls import path
from .views import OfertaListView, OfertaDetailView

urlpatterns = [
    path('', OfertaListView.as_view(), name='oferta-list'),
    path('<int:pk>/', OfertaDetailView.as_view(), name='oferta-detail'),
]