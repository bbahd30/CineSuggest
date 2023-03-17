from django.contrib import admin
from django.apps import apps

for model in apps.get_app_config('CineSuggest').models.values():
    admin.site.register(model)