from django.urls import path
from .views import (
  PersonaListView,
  PersonaDetailView,
  PersonaCreateView,
  PersonaUpdateView,
  )
  
app_name = 'personas'
urlpatterns = [ 
    path('', PersonaListView.as_view(), name='persona_list'),
    path('<int:pk>/', PersonaDetailView.as_view(), name='persona_detail'),
    path('create/', PersonaCreateView.as_view(), name = 'persona_create'),
    path('<int:pk>/update/', PersonaUpdateView.as_view(), name = 'persona_update'),
    #path('add/', personaCreateView, name='adding'),
    #path('<int:myID>/', personasShowObject, name = 'browsing'),
    #path('<int:myID>/delete/', personasDeleteView, name= 'deleting'),
    #path('', personasListView, name = 'listing'),
    #path('people', personaTestView, name='personas')
]