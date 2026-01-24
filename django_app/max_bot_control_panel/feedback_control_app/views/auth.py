from django.contrib.auth.views import LoginView

from feedback_control_app.forms import AuthenticationForm


#авторизации
class AuthenticationFormView(LoginView):
    template_name = 'feedback_control_app/login.html'
    authentication_form = AuthenticationForm
    next_page = 'feedback_control_app:index'