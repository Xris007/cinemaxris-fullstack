# CinemaXris — Reto FullStack

Aplicación de ecommerce para cadena de cines desarrollada con React JS y Spring Boot.

## Tecnologías

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API (AuthContext)

### Backend
- Spring Boot 3.5 + Java 17
- JWT (JSON Web Tokens)
- Swagger / OpenAPI (springdoc-openapi 2.5)
- MySQL 8
- Stored Procedures
- SLF4J Logs
- PayU Sandbox (Perú)

### DevOps
- Docker
- Docker Compose
- GitHub

---

## Pantallas

### 1. Home
- Listado de películas en cartelera
- Imagen a la izquierda, texto a la derecha
- Clic en imagen → navega a Login

### 2. Login
- Inicio de sesión simulado con Google (email + nombre)
- Opción de ingreso como Invitado
- Pop-up de bienvenida con nombre del cliente
- Botón "Aceptar" → navega a Dulcería

### 3. Dulcería
- Listado de productos con nombre, descripción y precio
- Selección de uno o más productos
- Totalizado actualizado en tiempo real
- Botón "Continuar" → navega a Pago

### 4. Pago
- Formulario con: número de tarjeta, expiración, CVV, email, nombre, tipo y número de documento
- Integración con PayU Sandbox Perú
- Llamada a /api/complete con datos de la transacción
- Pop-up de compra exitosa con ID de transacción

---

## Microservicios (puerto 8090)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/premieres | Listado de películas |
| GET | /api/candystore | Productos de dulcería |
| POST | /api/complete | Completar transacción |
| POST | /api/auth/login | Login y token JWT |
| POST | /api/payment/process | Procesar pago PayU |

Swagger UI: `http://localhost:8090/swagger-ui/index.html`

---

## Base de Datos

- MySQL 8
- Stored Procedures:
  - `sp_web_get_premieres()`
  - `sp_web_get_candy_items()`
  - `sp_web_save_transaction(p_email, p_names, p_dni, p_operationDate, p_transactionId)`

---

## Cómo ejecutar con Docker
```bash
docker-compose up --build
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:7000 |
| Backend | http://localhost:8090 |
| Swagger | http://localhost:8090/swagger-ui/index.html |
| MySQL | localhost:3307 |

---

## Cómo ejecutar sin Docker

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Tarjeta de prueba PayU

| Campo | Valor |
|-------|-------|
| Número | 4111 1111 1111 1111 |
| Expiración | 12/29 |
| CVV | 123 |
| Nombre | APPROVED |

---

## 📁 Estructura del proyecto
```
reto-fullstack/
├── backend/          # Spring Boot
│   ├── src/
│   └── Dockerfile
├── frontend/         # React + Vite
│   ├── src/
│   └── Dockerfile
├── mysql/            # MySQL init
│   ├── Dockerfile
│   └── 01_schema.sql
└── docker-compose.yml
```