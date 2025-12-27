# 📦 Catálogo de Productos – Backend

Backend para la aplicación de catálogo de productos y categorías.  
Implementa CRUD completo, paginación, filtros, ordenamiento y carga masiva de productos usando Node.js, Express, Sequelize y SQL Server.

---

## 🚀 Requisitos

- Node.js >= 18
- npm >= 9
- SQL Server (LocalDB, Express o Developer)
- Git

---

## 🛠️ Tecnologías

- Node.js
- Express
- Sequelize ORM
- SQL Server
- Swagger (OpenAPI)
- Multer (upload de archivos)
- XLSX (lectura de CSV/XLSX)

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=1433
DB_NAME=product_catalog
DB_USER=sa
DB_PASSWORD=admin

DB_DIALECT=mssql
```
---

## 🗄️ Cómo crear la base de datos
1. **Crear la base de datos en SQL Server**
   ```sql
   CREATE DATABASE product_catalog;
   GO
   ```
2. **Ejecutar los scripts de creación de tablas e índices:**
    - Categories
    - Products
3. **Ejecutar los índices y constraints**
    - Incluidos en el proyecto
4. **Usar SQL Server Management Studio (SSMS)**
    - Ejecuta los scripts desde SSMS para mayor facilidad

---

## ▶️ Cómo correr el backend
1. **Clonar el repositorio**
    ```bash
    git clone <url-del-repositorio>
    cd api_product_catalog
    ```
2. **Instalar dependencias**
    ```bash
        npm install
    ```
3. **Ejecutar en modo desarrollo**
    ```bash
        npm run dev
    ```
4. **Acceder a la API**
    - Disponible en 👉 http://localhost:3000

---

## 📚 Documentación API (Swagger)

La documentación OpenAPI está disponible en:

👉 http://localhost:3000/api-docs

Desde ahí se pueden probar todos los endpoints:
- **Categorías**
- **Productos**
- **Listado con filtros y paginación**
- **Carga masiva CSV/XLSX**