from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput


#форма для авторизации пользователя
class AuthenticationForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class': 'form-control border-primary','placeholder': 'Логин'}))
    password = forms.CharField(widget=PasswordInput(attrs={'class': 'form-control border-primary','placeholder':'Пароль'}))
    def confirm_login_allowed(self, user):
        pass


# Форма для ответа на обращение
class AnswerCivilianRequest(forms.Form):
    msg = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 6,
            'placeholder': 'Введите ваш ответ пользователю...'
        }),
        label='Текст ответа',
        required=True,
        error_messages={
            'required': 'Пожалуйста, введите текст ответа'
        }
    )