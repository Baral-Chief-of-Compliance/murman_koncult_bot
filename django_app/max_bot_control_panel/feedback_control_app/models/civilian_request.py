from django.db import models

from .max_bots import MaxBot
from .api_token import ApiToken


class CivilianRequest(models.Model):
    """Запрос гражданина"""
    max_bot = models.ForeignKey(
        verbose_name='Max бот', 
        to=MaxBot, 
        on_delete=models.CASCADE, 
        related_name='civilian_requests'
    )

    api_token = models.ForeignKey(
        verbose_name='Api токен', 
        to=ApiToken, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='civilian_requests')
    
    date_of_create = models.DateTimeField(
        verbose_name='Дата обращения',
        auto_now_add=True
    )

    user_id = models.CharField(
        verbose_name='Идентификатор пользователя в Max',
        max_length=256
    )
    msg = models.TextField(
        verbose_name='Сообщение пользователя',
        blank=True,
        null=True
    )

    answer_status = models.BooleanField(
        verbose_name='Статус ответа',
        default=False
    )

    def __str__(self) -> str:
        return f'Обращение гражданина {self.user_id} в боте {self.max_bot}'
    
    class Meta:
        verbose_name = 'Обращение гражданина'
        verbose_name_plural = 'Обращения граждан'
    
