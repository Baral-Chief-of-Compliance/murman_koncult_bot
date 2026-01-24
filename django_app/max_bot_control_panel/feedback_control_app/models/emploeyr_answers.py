import os

import requests
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .civilian_request import CivilianRequest


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
    civilian_request.answer_status = True
    civilian_request.save(update_fields=['answer_status'])