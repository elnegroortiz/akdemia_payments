# akdemia_gestion/Dockerfile

# --- Etapa 1: Construcción (usando Node) ---
# akdemia_gestion/Dockerfile

# --- Etapa 1: Construcción ---
# Usamos una versión específica (LTS - Long Term Support) para consistencia.
# La versión 'alpine' es más ligera pero a veces requiere más dependencias manuales.
# Usemos la versión completa por ahora para asegurar compatibilidad.
FROM node:20-bullseye as build-stage
# Instalar dependencias del sistema operativo para la compilación de paquetes de npm
# - python3, make, g++ son necesarios para node-gyp, una herramienta que muchos paquetes usan.
#RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++

WORKDIR /app

# Copiar archivos de dependencias. Usamos 'COPY package*.json ./' para copiar
# tanto 'package.json' como 'package-lock.json'.
COPY package*.json ./

# Instalar dependencias. '--silent' reduce el ruido en la salida.
RUN npm install --silent

# Copiar el resto del código de la aplicación.
COPY . .

# Ejecutar el script de construcción para producción.
RUN npm run build


# Etapa 2: Servidor Web Nginx para servir Vue
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiamos una config personalizada de Nginx para el gestion
COPY nginx-vue.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# --- Etapa 2: Producción ---
# Esta etapa no es estrictamente necesaria en nuestra configuración de Nginx centralizado,
# pero es bueno tenerla para entender el concepto. La dejaremos comentada.
# FROM nginx:stable-alpine
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]