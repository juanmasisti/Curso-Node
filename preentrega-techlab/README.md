# Pre-entrega CURSO NODE - Gestión de Productos con FakeStore API.

## Descripción

Este proyecto es una herramienta de línea de comandos (CLI) para gestionar productos utilizando la FakeStore API. Permite consultar, crear y eliminar productos desde la terminal mediante comandos.

## Requisitos

- Node.js versión 18 o superior (para soporte nativo de `fetch`).
- Conexión a internet para acceder a la FakeStore API.

## Cómo usar

1. Clonar el repositorio:
   - git clone https://github.com/juanmasisti/preentrega-techlab.git.
   - cd preentrega-techlab.

2. Ejecutar comandos con npm (EJEMPLOS):
   - npm run start GET products               # Obtener todos los productos
   - npm run start GET products/<productId>   # Obtener un producto por ID
   - npm run start POST products <title> <price> <category>  # Crear un nuevo producto
   - npm run start DELETE products/<productId>               # Eliminar un producto por ID

   
