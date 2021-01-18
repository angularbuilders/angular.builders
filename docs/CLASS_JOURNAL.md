# 1 Nx, grandes proyectos requieren mejores herramientas

## Instalación y configuración de Nx
- Tema: [Instalación y migración de aplicaciones para usar con Nx](https://www.notion.so/albr/Angular-Escalable-ef905bb0b90846b2ac423ed35c276a6e#7c09b824b7694d46b71bf8e2fb97bfbf)

- Pull Request: [1-style-Configure-Names-and-Prefixes PR: #2](https://github.com/angularbuilders/angular.builders/pull/2)

Aunque el repositorio se llama `Angular.Builders` se usa como prefijo `ab` por ser más corto complementado con el nombre de la _app_ o _lib_ que corresponda.

En este caso `"prefix": "ab-showcase",` tanto en `angular.json` como en `apps\showcase\.eslintrc.json`

---

## Estructura de soluciones: aplicaciones y librerías

- Tema: [Instalación y migración de aplicaciones para usar con Nx](https://www.notion.so/albr/Angular-Escalable-ef905bb0b90846b2ac423ed35c276a6e#59b96283feaa4cf78e6f364b2a7d1b61)

- Pull Request: [refactor-Aplicaciones-Librerías-y-módulos PR: #4](https://github.com/angularbuilders/angular.builders/pull/4)

### 📘 Core Module

Módulo destinado a enrutado y dependencias de otros módulos

`ng generate @schematics/angular:module --name=core --project=showcase --routing --routingScope=Root --no-interactive --dry-run`

### 📚 UI Lib

Librería especializada en componentes reutilizables.

`ng generate @nrwl/angular:library --name=ui --buildable --enableIvy --linter=eslint --prefix=ab-ui --strict --no-interactive --dry-run`

### 📚 Data Lib

Librería especializada en servicios de acceso remoto y gestión local de datos

`ng generate @nrwl/angular:library --name=data --buildable --enableIvy --linter=eslint --prefix=ab-data --strict --no-interactive --dry-run`

### 📚 Auth Lib

Librería especializada en temas de seguridad, con servicios, componentes y rutas

> 🚨 Esta librería gestiona rutas de carga diferida. ¡Y puede usarse en distintos proyectos!

`ng generate @nrwl/angular:library --name=auth --buildable --enableIvy --lazy --linter=eslint --parentModule=apps\showcase\src\app\core\core-routing.module.ts --prefix=ab-auth --routing --no-interactive --dry-run`

---

## Nx ecosystem jest, cypress, storybook

- Tema: [Ecosistema y utilidades de Nx (Cypress, Jest, StoryBook)](https://www.notion.so/albr/Angular-Escalable-ef905bb0b90846b2ac423ed35c276a6e#79bae06e6976489992b18594daf62b62)

- Pull Request: [test-Nx-ecosystem-jest-cypress-storybook PR: #6](https://github.com/angularbuilders/angular.builders/pull/6)

> jest configurado de serie. 💡 Se puede deshabilitar para componentes presentacionales.

### 🐲 StoryBook
`npm i -D @nrwl/storybook`

#### 📚 UI Lib

Probar la interacción de sus componentes con storybook

`ng generate @nrwl/angular:storybook-configuration --name=ui --no-configureCypress --no-generateCypressSpecs --generateStories --no-interactive --dry-run`

#### 📚 Auth Lib

Además probar las páginas con cypress

`ng generate @nrwl/angular:storybook-configuration --name=auth --configureCypress --generateCypressSpecs --generateStories --no-interactive --dry-run`
