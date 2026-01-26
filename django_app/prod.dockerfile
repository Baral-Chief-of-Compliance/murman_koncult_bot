
FROM max_bot_django_app:v1.0

#установка зависимостей
COPY . .

# Проверяем что файл скопировался
RUN ls -la start.dev.sh

# Меняем формат файла на Unix (на всякий случай)
RUN sed -i 's/\r$//' start.dev.sh

RUN chmod +x ./start.dev.sh

ENTRYPOINT ["/bin/sh", "-c", "sleep 60 && /home/django-app/start.dev.sh"]

EXPOSE 8000