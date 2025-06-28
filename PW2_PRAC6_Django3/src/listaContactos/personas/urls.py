from django.urls import path
from personas.views import (
  personaTestView, 
  personaCreateView,
  personasShowObject,
  personasDeleteView,
  personasListView,
  )

app_name = 'personas'
urlpatterns = [ 
    
    path('add/', personaCreateView, name='adding'),
    path('<int:myID>/', personasShowObject, name = 'browsing'),
    path('<int:myID>/delete/', personasDeleteView, name= 'deleting'),
    path('', personasListView, name = 'listing'),
    path('people', personaTestView, name='personas')
]