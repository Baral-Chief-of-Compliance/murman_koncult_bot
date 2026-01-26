FROM python:3.13-slim

RUN mkdir -p /home/django-app

WORKDIR /home/django-app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r ./requirements.txt

CMD ["python3", "--version"]

# #установка зависимостей
# COPY . .

# # Проверяем что файл скопировался
# RUN ls -la start.dev.sh

# # Меняем формат файла на Unix (на всякий случай)
# RUN sed -i 's/\r$//' start.dev.sh

# RUN chmod +x ./start.dev.sh

# ENTRYPOINT ["/bin/sh", "-c", "sleep 60 && /home/django-app/start.dev.sh"]

# EXPOSE 8000