from django.contrib import admin
from django.urls import path, include
from inicio.views import myHomeView, anotherView

urlpatterns = [
    path('personas/', include('personas.urls')),
    path('', myHomeView, name='PaginaInicio'),    
    path('another', anotherView, name='otra'),
    path('admin/', admin.site.urls),
]
