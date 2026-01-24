from rest_framework import serializers

from feedback_control_app.models import CivilianRequest


class CivilianRequestCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для отправки обрещений граждан в систему"""
    class Meta:
        model = CivilianRequest
        fields = ['user_id', 'msg', 'max_bot', 'api_token']
        read_only_fields = ['max_bot', 'api_token']