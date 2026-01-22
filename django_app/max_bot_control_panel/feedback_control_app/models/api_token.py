import secrets

from django.db import models

from .max_bots import MaxBot


def generate_api_token() -> str:
    """Генерация api токена"""
    return secrets.token_urlsafe(32)


class ApiToken(models.Model):
    """Api токен для взаимодействия с ботом через это приложение"""
    max_bot = models.ForeignKey(
        verbose_name='Max бот', 
        to=MaxBot, 
        on_delete=models.CASCADE, 
        related_name='api_tokens'
    )
    name = models.CharField(verbose_name='Наименование Api ключа', max_length=256)
    date_of_create = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    active = models.BooleanField(verbose_name='Статус активности', default=True)
    token = models.CharField(verbose_name='Токен', default=generate_api_token, max_length=100)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'Api токен для бота'
        verbose_name_plural = 'Api токены для ботов'
