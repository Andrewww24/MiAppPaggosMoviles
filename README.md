# MiAppPagos 📱

Aplicación móvil desarrollada en **React Native con Expo** que consume datos desde la API REST del proyecto **PagosMoviles** y muestra la información en una lista.

---

## 📋 Descripción

Esta aplicación forma parte del proyecto de Pagos Móviles. Conecta con el microservicio `UsuariosService` para obtener y mostrar la lista de usuarios registrados en el sistema.

**Funcionalidades:**
- Consumo de API REST (`GET /user`)
- Visualización de usuarios en lista con `FlatList`
- Avatar con inicial y color personalizado por usuario
- Manejo de estados: cargando, error y datos

---

## 🛠️ Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- TypeScript
- API REST: PagosMoviles.UsuariosService (.NET)

----

## ▶️ Requisitos previos

Antes de correr el proyecto necesitás tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Expo Go](https://expo.dev/go) en tu celular (Android o iOS)
- El microservicio `PagosMoviles.UsuariosService` corriendo localmente

---

## 🚀 Cómo correr el proyecto

### 1. Cloná el repositorio

```bash
git clone https://github.com/TU_USUARIO/MiAppPagos.git
cd MiAppPagos
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Configurá la URL de la API

Abrí el archivo `app/usuarios.tsx` y cambiá la URL base:

```javascript
// Para ver en navegador (web)
const BASE_URL = 'http://localhost:5291';

// Para ver en celular físico con Expo Go
// Reemplazá con tu IP local (ejecutá ipconfig en Windows)
const BASE_URL = 'http://192.168.X.X:5291';
```

### 4. Levantá el microservicio UsuariosService

Abrí `PagosMoviles.UsuariosService` en Visual Studio y correlo con el perfil **http**.

### 5. Iniciá la aplicación

```bash
npx expo start
```

### 6. Abrí la app

| Plataforma | Instrucción |
|---|---|
| 🌐 Navegador | Presioná `w` en la terminal |
| 📱 Celular | Escaneá el QR con la app Expo Go |
| 🤖 Android Emulator | Presioná `a` en la terminal |

> ⚠️ Para usar Expo Go en celular físico, el celular y la PC deben estar en el **mismo WiFi**.

---

## 📁 Estructura del proyecto

```
MiAppPagos/
├── app/
│   ├── (tabs)/         # Navegación por tabs
│   ├── usuarios.tsx    # Pantalla principal - Lista de usuarios
│   └── _layout.tsx     # Layout raíz
├── assets/             # Imágenes y recursos
├── components/         # Componentes reutilizables
└── package.json
```

---

## 📸 Capturas de pantalla

> Agregá aquí capturas de pantalla de la app funcionando.
<img width="1911" height="703" alt="image" src="https://github.com/user-attachments/assets/fff0ffd8-161b-47f0-9119-81de925cd1d8" />



