from django.db import models

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
         
class Keyword(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
class Movie(models.Model):
    budget = models.BigIntegerField()
    homepage = models.URLField(max_length=255, null=True, blank=True)
    id = models.IntegerField(primary_key=True)
    original_language = models.CharField(max_length=10)
    original_title = models.CharField(max_length=255)
    overview = models.TextField(null=True, blank=True)
    popularity = models.FloatField()
    release_date = models.DateField()
    revenue = models.BigIntegerField()
    runtime = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20)
    tagline = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255)
    vote_average = models.FloatField()
    vote_count = models.IntegerField()
    genres = models.ManyToManyField(Genre)
    keywords = models.ManyToManyField(Keyword)

    def __str__(self):
        return self.title