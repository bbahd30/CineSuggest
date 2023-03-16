import pandas as pd
import numpy as np
# for converting string to list format
import ast
# for stemming
import nltk 
from nltk.stem.porter import PorterStemmer

# for count vectorization
import sklearn
from sklearn.feature_extraction.text import CountVectorizer

#for knowing similarity using cosine rule
from sklearn.metrics.pairwise import cosine_similarity 

# for model
import pickle
ps = PorterStemmer()
cv = CountVectorizer(max_features = 7000, stop_words = 'english')


def stem(text):
    stemmed_data = []
    for word in text.split():
        stemmed_data.append(ps.stem(word))

    return " ".join(stemmed_data)
movies = pd.read_csv('movieDataset/movieData.csv')
credits = pd.read_csv('movieDataset/movieCreditsData.csv')

movies = movies.merge(credits, on='title')

# recommedation based on 
# genres
# keywords
# original_language

movies = movies[['movie_id',
                       'title',
                        'overview',
                        'cast',
                        'crew',
                        'genres',
                        'keywords',]]
 
def give_genres(genres_list):
    genres = []
    for genre in ast.literal_eval(genres_list):
        genres.append(genre['name'])
    return genres

def prime_cast(cast_list):
    cast = []
    counter = 4
    for person in ast.literal_eval(cast_list):
        if counter > 0:
            cast.append(person['name'])
        counter = counter - 1
    return cast

def get_director(crew_list):
    director = []
    for person in ast.literal_eval(crew_list):
        if person['job'] == 'Director':
            director.append(person['name'])
    return director

def remove_space(para_list):
    merged_list = []
    for paramter in para_list:
        merged_list.append(paramter.replace(" ", ""))
    return merged_list

    
movies['genres'] = movies['genres'].apply(give_genres)
movies['keywords'] = movies['keywords'].apply(give_genres)
movies['cast'] = movies['cast'].apply(prime_cast)
movies['director'] = movies['crew'].apply(get_director)

# remove the space between a paramter to split
movies['genres'] = movies['genres'].apply(remove_space)
movies['keywords'] = movies['keywords'].apply(remove_space)
movies['cast'] = movies['cast'].apply(remove_space)
movies['cast'] = movies['cast'].apply(remove_space)

movies['overview'] = movies['overview'].apply(lambda i: i.split())
movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['director']

movies_data = movies.drop(columns=['overview',
                                   'genres', 
                                   'keywords',
                                   'director',
                                   'cast',
                                   'crew'])

movies_data['tags'] = movies_data['tags'].apply(lambda x: " ".join(x).lower())
movies_data['tags'] = movies_data['tags'].apply(stem)

similarity_vector = cv.fit_transform(movies_data['tags']).toarray() 
similarity = cosine_similarity(similarity_vector)

def recommend(movie):
    index = movies_data[movies_data['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x:x[1])
    for movie in distances[1:8]:
        print(movie)
        print(movies_data.iloc[movie[0]].title)
print(recommend('Avatar'))

pickle.dump(movies_data, open('Model/movies_list.pkl', 'wb'))
pickle.dump(similarity, open('Model/similarity.pkl', 'wb'))
