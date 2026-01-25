import os
import logging

import requests
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .civilian_request import CivilianRequest


logger = logging.getLogger('main')


class EmploeyrAnswer(models.Model):
    """Ответ сотрудника ЦЗН"""
    civilian_request = models.OneToOneField(
        verbose_name='Обращение гражданина',
        to=CivilianRequest,
        on_delete=models.CASCADE,
        related_name='emploeyr_answers'
    )
    msg = models.TextField(
        verbose_name='Текст сотрудника'
    )

    date_of_create = models.DateTimeField(
        verbose_name='Дата создания',
        auto_now_add=True
    )

    user = models.ForeignKey(
        verbose_name='Сотрудник',
        to=User,
        null=True,
        on_delete=models.SET_NULL,
        related_name='emploeyr_answers'
    )

    def __str__(self) -> str:
        return f'Ответ на обращение {self.civilian_request}'
    
    class Meta:
        verbose_name = 'Ответ сотрудника на обращение'
        verbose_name_plural = 'Ответы сотрудников на обращения'


@receiver(post_save, sender=EmploeyrAnswer)
def change_answer_status_civilian_request(sender, instance, **kwargs):
    civilian_request : CivilianRequest = instance.civilian_request

    
    proxies = {}
    headers = {
        'Authorization': civilian_request.max_bot.token,
        'Content-Type': 'application/json'
    }
    if bool(int(os.getenv('PROXY_USE'))):
        proxies['http'] = os.getenv('PROXY_PATH')
        proxies['https'] = os.getenv('PROXY_PATH')
    
    response = requests.post(
        headers=headers,
        proxies=proxies,
        url=f'https://platform-api.max.ru/messages?user_id={civilian_request.user_id}',
        data={
            "text": f'{instance.msg}'   
        }
    )
    if response.status_code == 200:
        logger.info('msg is send')
        civilian_request.answer_status = True
        civilian_request.save(update_fields=['answer_status'])
    else:
        logger.error(
            f'error while sending msg to {civilian_request.user_id} code: {response.status_code} error: {response.text}'
        )
    
