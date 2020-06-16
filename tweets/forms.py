from django import forms

from .models import Tweet

MAX_LENGHT = 240


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content =self.cleaned_data.get('content')
        if len(content) > MAX_LENGHT:
            raise forms.ValidationError("This tweet is too long")
        return  content
