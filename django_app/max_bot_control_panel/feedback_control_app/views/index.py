from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView

from feedback_control_app.models import MaxBot


#Список ботов
class MabBotListView(LoginRequiredMixin, ListView):
    login_url = 'feedback_control_app:login'
    model=MaxBot
    template_name='feedback_control_app/max_bot_list.html'
    context_object_name='max_bots'

#Информация об обращениях в бот
class MaxBotDetailView(LoginRequiredMixin, DetailView):
    login_url = 'feedback_control_app:login'
    model=MaxBot
    template_name='feedback_control_app/max_bot_detail.html'
    context_object_name='max_bot'