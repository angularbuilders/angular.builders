# ▶ 0. Nx, grandes proyectos requieren mejores herramientas

## 🎯 Objetivos

- Las grandes aplicaciones necesitan herramientas adecuadas
- Nx es la caja de herramientas ideal para desarrollar grandes aplicaciones
- Aprende a Instalar, configurar y usar las extensiones de Narwhal

## ⛓ Enlaces

[Nx: Extensible Dev Tools for Monorepos](https://nx.dev/)

[migration: Migrating existing code bases | Nx angular documentation](https://nx.dev/latest/angular/migration/overview)

## 💻 Código

### Ejemplo

[angularbuilders/angular.builders](https://github.com/angularbuilders/angular.builders/tree/1-style-Configure-Names-and-Prefixes)

### Laboratorio

---

# 1️⃣ - Instalación y configuración de Nx

## 👨‍🏫 CLI ++

## 👨‍🏫 Consola gráfica

 [https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

## ✍ Práctica

```bash
npm i -g @angular/cli@latest
ng v
npx create-nx-workspace --preset=angular
# contestar y esperar....
```

---

# 2️⃣ - Estructura de soluciones mono repositorio

¿Por qué un **Mono Repositorio** de múltiples aplicaciones y librerías?

## 👨‍🏫 Compartir código

### Entre aplicaciones internas

### En repositorios públicos

## 👨‍🏫 Dividir en proyectos pequeños

### Compilado, prueba y despliegue atómicos

### Manteniendo control y estándares

## 👨‍🏫 Workspace

### Apps

### Libs

### Tools

## ✍ Práctica

### Core Module

Módulo destinado a enrutado y dependencias de otros módulos. *Lo de siempre 💤*

```bash
ng g @schematics/angular:module core --project=showcase --routing --routingScope=Root
```

### UI Lib

Librería especializada en **componentes** reutilizables.

```bash
ng g @nrwl/angular:library ui --buildable --enableIvy --linter=eslint --prefix=ab-ui --strict
```

### Data Lib

Librería especializada en **servicios** de acceso remoto y gestión local de datos

```bash
ng g @nrwl/angular:library data --buildable --enableIvy --linter=eslint --prefix=ab-data --strict
```

### Auth Lib

Librería especializada en temas de **seguridad**, con servicios, componentes y rutas

Esta librería gestiona **rutas** de carga diferida. ¡Y puede usarse en distintos proyectos!

```bash
ng g @nrwl/angular:library auth --buildable --enableIvy --lazy --linter=eslint --parentModule=apps\showcase\src\app\core\core-routing.module.ts --prefix=ab-auth --routing
```

---

# 3️⃣ - Ecosistema y utilidades de Nx

## 👨‍🏫 Estilo

### Prettier

### EsLint

## 👨‍🏫 Compilación

### Diferencial

### Cloud

## 👨‍🏫 Pruebas

### Jest

### Cypress

### StoryBook

## ✍ Práctica