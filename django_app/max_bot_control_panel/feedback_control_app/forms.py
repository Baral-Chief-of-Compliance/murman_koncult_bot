from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput


#форма для авторизации пользователя
class AuthenticationForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class': 'form-control border-primary','placeholder': 'Логин'}))
    password = forms.CharField(widget=PasswordInput(attrs={'class': 'form-control border-primary','placeholder':'Пароль'}))
    def confirm_login_allowed(self, user):
        pass