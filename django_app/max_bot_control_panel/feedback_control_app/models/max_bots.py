from django.db import models

# Create your models here.
class MaxBot(models.Model):
    """Макс бота"""
    name = models.CharField(verbose_name='Наименование бота', max_length=256)
    token = models.TextField(verbose_name='Токен бота')
    date_of_create = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    max_url = models.CharField(verbose_name='Ссылка на бота в максе', max_length=256)

    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'Макс бот'
        verbose_name_plural = 'Макс боты'