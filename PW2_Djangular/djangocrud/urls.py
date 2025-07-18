from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'movie', views.MovieViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # La API se accede desde /api/movie/
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
