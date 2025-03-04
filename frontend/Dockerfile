#базовый родительский образ
FROM node:16-slim 
# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы
COPY . .

# Соберите приложение
RUN npm run build

# Установите сервер для обслуживания статических файлов
RUN npm install -g serve

# Запустите сервер
CMD ["serve", "-s", "build", "-l", "3000"]