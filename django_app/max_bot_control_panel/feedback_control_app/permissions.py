from rest_framework.permissions import BasePermission
from rest_framework.request import Request

from feedback_control_app.models import ApiToken


class ApiTokenPermission(BasePermission):
    """Для запросов бота к сервису"""
    def has_permission(self, request : Request, view):
        permission = True
        api_token = request.headers.get('Api-token', None)
        if api_token:
            try:
                api_token_in_db = ApiToken.objects.get(
                    token=api_token
                )
                if not api_token_in_db.active:
                    permission = False
            except ApiToken.DoesNotExist:
                permission = False
        else:
            permission = False

        return permission