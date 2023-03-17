from django.contrib import admin
from django.urls import path
from CineSuggest.views import *
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register(r'movies', MovieViewset, basename='uploadcsv')


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('uploadmovie/', upload_movie, name='upload-movie-csv'),

]