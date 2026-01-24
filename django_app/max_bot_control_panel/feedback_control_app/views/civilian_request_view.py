from django.views.generic import  FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404

from feedback_control_app.forms import AnswerCivilianRequest
from feedback_control_app.models import CivilianRequest, MaxBot, EmploeyrAnswer


class AnswerCivilianRequestView(LoginRequiredMixin,FormView):
    login_url = 'feedback_control_app:login'
    template_name = 'feedback_control_app/answer_civilian_request_form.html'
    form_class = AnswerCivilianRequest


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        max_bot = get_object_or_404(MaxBot,  pk=self.kwargs['pk'])
        civilian_request = get_object_or_404(CivilianRequest, pk=self.kwargs['cr_id'])
        context['civilian_request'] = civilian_request
        return context

    def form_valid(self, form):
        civilian_request = get_object_or_404(CivilianRequest, pk=self.kwargs['cr_id'])

        EmploeyrAnswer.objects.create(
            civilian_request=civilian_request,
            msg=form.cleaned_data['msg'], 
            user=self.request.user
        )
        return super().form_valid(form)
    
    def get_success_url(self) -> str:
        return reverse_lazy('feedback_control_app:max_bot_detail', kwargs={'pk': self.kwargs['pk']})