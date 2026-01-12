# OpenCircuit Web

**Editor de circuitos electrónicos en la web**
*Diseña circuitos electrónicos directamente desde el navegador*

---

## 📌 Descripción

**OpenCircuit Web** es una aplicación web para diseñar circuitos electrónicos de forma visual, directamente desde el navegador, sin necesidad de instalar software.

Está inspirada en herramientas como **Proteus**, pero enfocada en ser:

* Accesible
* Ligera
* 100% web

El proyecto se desarrolla de forma **incremental**, comenzando con un editor visual (MVP) y evolucionando hacia simulación básica y funciones educativas.

---

## 🎯 Objetivo

Proveer una herramienta moderna para que estudiantes y entusiastas de la electrónica puedan **crear, visualizar y entender circuitos** de manera intuitiva desde cualquier navegador.

---

## 🧱 Stack tecnológico

### Frontend

* **React + Vite** – base del proyecto
* **React Router** – navegación entre vistas
* **Redux Toolkit** – estado global del circuito
* **Konva.js + react-konva** – canvas interactivo
* **Material UI (MUI)** – interfaz de usuario
* **Axios** – comunicación con backend

> No se utiliza Next.js en esta etapa, ya que no se requiere SEO ni SSR y se prioriza la simplicidad del MVP.

---

### Backend (planeado)

* **Node.js**
* **Express**
* **MongoDB + Mongoose**
* **JWT** – autenticación

El backend se incorporará en fases posteriores para permitir cuentas de usuario y guardado en la nube.

---

## 🏗️ Arquitectura general

### Frontend

* UI con Material UI
* Canvas interactivo
* Manejo de estado con Redux
* Routing con React Router

### Backend

* Autenticación de usuarios
* Persistencia de circuitos
* Gestión de planes (free / premium)

---

## 📦 Funcionalidades (por fases)

### 🟢 Fase 1 – MVP (Editor visual)

* Canvas con grid
* Zoom y desplazamiento
* Componentes básicos (resistencia, batería, LED, switch)
* Drag & drop
* Conexión entre componentes (wires)
* Guardado local (LocalStorage)
* Exportación a JSON e imagen

---

### 🔵 Fase 2 – Cuentas de usuario

* Registro e inicio de sesión
* Guardado en la nube
* Límite de circuitos en plan gratuito

---

### 🟣 Fase 3 – Simulación básica

* Animación de corriente (simulada)
* Estados básicos de componentes (LED on/off)
* Modo educativo

---

## 💎 Sistema freemium

Desde el inicio, la aplicación contempla un modelo **free / premium**:

* Funciones premium visibles pero bloqueadas
* Mensajes de *"Próximamente"*
* Botones de actualización de plan

Esto permite diseñar el producto con una visión real desde el MVP.

---

## 📁 Estructura del proyecto (Frontend)

```txt
src/
├─ app/
│  └─ store.js
├─ features/
│  ├─ circuit/
│  ├─ user/
│  └─ ui/
├─ components/
├─ pages/
├─ canvas/
├─ services/
└─ routes/
```

---

## 🚀 Estado del proyecto

Actualmente en desarrollo del **MVP (Fase 1)**.

---

## 📄 Licencia

Proyecto de uso educativo y demostrativo.