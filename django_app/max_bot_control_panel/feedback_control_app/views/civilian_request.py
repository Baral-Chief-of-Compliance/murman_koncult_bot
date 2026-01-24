from rest_framework import viewsets, status
from rest_framework.response import Response

from feedback_control_app.permissions import ApiTokenPermission
from feedback_control_app.models import CivilianRequest, ApiToken
from feedback_control_app.serializer import CivilianRequestCreateSerializer


class CivilianRequestView(viewsets.ModelViewSet):
    """View set для обращения граждан"""

    queryset = CivilianRequest.objects.all()
    permission_classes = [ApiTokenPermission]
    serializer_class = CivilianRequestCreateSerializer


    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():   
            api_token = request.headers.get('Api-token')
            api_token_in_db  = ApiToken.objects.get(
                token=api_token
            )
            serializer.save(
                max_bot=api_token_in_db.max_bot,
                api_token=api_token_in_db
            )
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )