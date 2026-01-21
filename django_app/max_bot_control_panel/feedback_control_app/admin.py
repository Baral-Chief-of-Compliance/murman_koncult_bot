from django.contrib import admin

from feedback_control_app.models import MaxBot, ApiToken,\
CivilianRequest, EmploeyrAnswer, EmploeyrAnswerGrade


@admin.register(MaxBot)
class MaxBotAdmin(admin.ModelAdmin):
    list_display = ('name',)
    readonly_fields = ('date_of_create',)


@admin.register(ApiToken)
class ApiTokenAdmin(admin.ModelAdmin):
    list_display = ('name', 'max_bot', 'active')
    readonly_fields = ('token', 'date_of_create', )


@admin.register(CivilianRequest)
class CivilianRequestAdmin(admin.ModelAdmin):
    list_display = ('max_bot', 'user_id', 'answer_status',)
    readonly_fields = ('user_id', 'msg', 
                       'date_of_create', 'answer_status', 'max_bot',
                       'api_token'
    )


@admin.register(EmploeyrAnswer)
class EmploeyrAnswerAdmin(admin.ModelAdmin):
    list_display = ('civilian_request', 'date_of_create', 'user')
    readonly_fields = (
        'civilian_request', 'date_of_create', 'user'
    )


@admin.register(EmploeyrAnswerGrade)
class EmploeyrAnswerGradeAdmin(admin.ModelAdmin):
    list_display = ('ea', 'ea_grade', )
    readonly_fields = ('ea', 'date_of_create', 'ea_grade')