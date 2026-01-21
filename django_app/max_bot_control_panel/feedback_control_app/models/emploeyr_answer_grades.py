from django.db import models

from .emploeyr_answers import EmploeyrAnswer


GRADES_TYPE = [
    (1, 'Полный провал'),
    (2, 'Неудовлетворительно'),
    (3, 'Удовлитворительно'),
    (4, 'Хорошо'),
    (5, 'Отлично'),
]

class EmploeyrAnswerGrade(models.Model):
    """Оценка ответа сотрудника"""
    ea = models.OneToOneField(
        verbose_name='Ответ сотрудника ЦЗН',
        to=EmploeyrAnswer,
        on_delete=models.CASCADE
    )

    ea_grade = models.PositiveSmallIntegerField(
        verbose_name='Степень удовлитворенности ответом',
        choices=GRADES_TYPE
    )

    date_of_create = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Оценка на {self.ea}'
    
    class Meta:
        verbose_name = 'Оценка ответа сотрудника ЦЗН'
        verbose_name_plural = 'Оценка ответов сотрудников ЦЗН'