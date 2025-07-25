from django.urls import path
from .views import (
  PersonaListView,
  PersonaDetailView,
  PersonaCreateView,
  PersonaUpdateView,
  PersonaDeleteView,
  PersonaQueryView,
  )
  
app_name = 'personas'
urlpatterns = [ 
    path('', PersonaListView.as_view(), name='persona_list'),
    path('<int:pk>/', PersonaDetailView.as_view(), name='persona_detail'),
    path('create/', PersonaCreateView.as_view(), name = 'persona_create'),
    path('<int:pk>/update/', PersonaUpdateView.as_view(), name = 'persona_update'),
    path('<int:pk>/delete/', PersonaDeleteView.as_view(), name = 'persona_delete'),
    path('query/', PersonaQueryView.as_view(), name = 'persona_query'),
]