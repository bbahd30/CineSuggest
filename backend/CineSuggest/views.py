import csv, json, requests
from django.shortcuts import render
from .movie_form import MovieForm
from .models import *
from rest_framework import viewsets
from .serializers import *
import pickle

movies = pickle.load(open('model/movies_list.pkl', 'rb'))
similarity = pickle.lead(open('model.similarity.pkl', 'rb'))

def upload_movie(request):
    if request.method == 'POST':
        form = MovieForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = request.FILES['csv_file']
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded_file)
            for row in reader:
                try:
                    movie = Movie(
                        budget=row['budget'],
                        homepage=row['homepage'],
                        id=row['id'],
                        original_language=row['original_language'],
                        original_title=row['original_title'],
                        overview=row['overview'],
                        popularity=row['popularity'],
                        release_date=row['release_date'],
                        revenue=row['revenue'],
                        runtime=row['runtime'],
                        status=row['status'],
                        tagline=row['tagline'],
                        title=row['title'],
                        vote_average=row['vote_average'],
                        vote_count=row['vote_count']
                    )
                    movie.save()

                    genres = json.loads(row['genres'])
                    for genre in genres:
                        genre_obj, _ = Genre.objects.get_or_create(id=genre["id"], name=genre["name"])
                        movie.genres.add(genre_obj)

                    keywords = json.loads(row['keywords'])
                    for keyword in keywords:
                        keyword_obj, _ = Keyword.objects.get_or_create(id=keyword["id"], name=keyword["name"])
                        movie.keywords.add(keyword_obj)

                except (ValueError, KeyError, json.JSONDecodeError) as e:
                    # log the error and move on to the next row
                    print(f"Error processing row: {e}")
                    continue

            return render(request, 'upload_movie_csv.html', {'form': form, 'success': True})
    else:
        form = MovieForm()
    return render(request, 'upload_movie.html', {'form': form})

class MovieViewset(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()

def find_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_url = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_url
    return full_path

def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x:x[1])
    recommended_names = []
    recommended_poster = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].movie_id
        recommended_names.append(movie.iloc[i[0]].title)
        recommended_poster.append(find_poster(movie_id))

    return recommended_names, recommended_poster