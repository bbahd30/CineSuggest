from django import forms

class MovieForm(forms.Form):
    csv_file = forms.FileField()
