import os

from django.core.management.base import BaseCommand, CommandError

from feedback_control_app.models import ApiToken, MaxBot


class Command(BaseCommand):
    """Команда по настройке murman_konsult_bot"""
    help = 'Setings apt token and info about first czn max bot'

    def handle(self, *args, **options):
        try:
            max_bot = MaxBot.objects.get(
                token=os.getenv('MAX_BOT_TOKEN'),
                name=os.getenv('MAX_BOT_NAME'),
                max_url=os.getenv('MAX_BOT_URL')
            )
        except MaxBot.DoesNotExist:
            max_bot = MaxBot(
                token=os.getenv('MAX_BOT_TOKEN'),
                name=os.getenv('MAX_BOT_NAME'),
                max_url=os.getenv('MAX_BOT_URL')
            )
            max_bot.save()

            self.stdout.write(
                self.style.SUCCESS('Successfully create max bot info "%s"' % max_bot.name)
            )

        try:
            ApiToken.objects.get(
                token=os.getenv('MAX_BOT_API_TOKEN'),
                max_bot=max_bot,
                name=os.getenv('MAX_BOT_API_NAME')
            )
        except ApiToken.DoesNotExist:
            api_token = ApiToken(
                token=os.getenv('MAX_BOT_API_TOKEN'),
                max_bot=max_bot,
                name=os.getenv('MAX_BOT_API_NAME')
            )

            api_token.save()

            self.stdout.write(
                self.style.SUCCESS('Successfully create api_token for_max_bot "%s"' % max_bot.name)
            )