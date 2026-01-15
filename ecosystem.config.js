module.exports = {
  apps: [{
    name: "max-bot-murman-koncult",
    script: "./dist/bot.js",
    instances: 1, // или 'max' для использования всех ядер CPU
    exec_mode: "fork", // для ботов лучше fork чем cluster
    watch: false, // отключить watch в продакшене
    autorestart: true,
    env: {
      NODE_ENV: "production",
      NODE_OPTIONS: "--max-old-space-size=1024"
    },
    env_development: {
      NODE_ENV: "development"
    },
    log_file: "./logs/combined.log",
    out_file: "./logs/out.log",
    error_file: "./logs/error.log",
    time: true,
    max_memory_restart: "500M", // перезапуск при превышении памяти
    node_args: "--max-old-space-size=1024"
  }]
}