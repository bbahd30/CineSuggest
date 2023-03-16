from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *

class MovieList(viewsets.ModelViewSet):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
