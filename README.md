# TypeHero 2.0 • Aventura de Mecanografía Gamificada

[![Estado](https://img.shields.io/badge/Estado-Producción-emerald.svg)](#)
[![Motor](https://img.shields.io/badge/Framework-Phaser%203.60-blue.svg)](#)
[![Web Speech API](https://img.shields.io/badge/Audio-Web%20Speech%20Synthesis-cyan.svg)](#)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green.svg)](#)

Videojuego educativo 2D para el aprendizaje táctil del teclado orientado al público infantil. Integra síntesis de voz nativa en el navegador, analítica adaptativa de error por tecla, progresión por misiones y persistencia local sin dependencias de servidor.

---

## 1. Fundamentación Pedagógica y Didáctica
El diseño instruccional sigue una progresión por andamiaje cognitivo:
- **Metodología de Teclado Ciego (Touch Typing):** Introducción secuencial basada en la fila guía (`ASDF` y `JKLÑ`), asignación ergonómica dedo-tecla y coordinación visomotriz con refuerzo fonético en tiempo real.
- **Doble Bucle de Retroalimentación:**
  - *Auditivo:* Guía fonética mediante síntesis por voz (`SpeechSynthesisUtterance`) para anticipar la tecla esperada e instruir al estudiante.
  - *Visual Gamer:* Teclado reactivo en pantalla con resaltado de borde neón, pulso animado de la tecla destino y señalética de éxito/error.

## 2. Arquitectura de Software y Código Limpio
El proyecto aplica separación de responsabilidades y modularidad desacoplada:

```plaintext
TECLADO_GAME/
├── index.html                   # Contenedor principal y bootstrap del juego
├── assets/
│   ├── images/                  # Sprites vectoriales y avatares PNG
│   └── audio/                   # Efectos sonoros y assets de audio
├── src/
│   ├── core/
│   │   ├── DifficultyAdapter.js # Algoritmo de detección de teclas críticas
│   │   ├── ProgressManager.js   # Persistencia local (localStorage) y desbloqueos
│   │   ├── VoiceEngine.js       # Wrapper de Web Speech API (síntesis de voz)
│   │   └── KeyboardEngine.js    # Motor de captura y validación de pulsaciones
│   ├── data/
│   │   ├── levels.json          # Configuración pedagógica de lecciones y dedos
│   │   └── rewards.json         # Catálogo de recompensas y avatares
│   └── game/
│       ├── entities/
│       │   └── VisualKeyboard.js# Renderizado procedural del teclado QWERTY en Phaser
│       ├── scenes/
│       │   ├── BootScene.js     # Precarga asíncrona de recursos y texturas
│       │   ├── MenuScene.js     # Selección de avatar y registro del héroe
│       │   ├── GameplayScene.js # Bucle principal de tecleo y eventos
│       │   └── ShopScene.js     # Sistema de economía local y cosméticos
│       └── PhaserConfig.js      # Configuración del canvas y físicas de Phaser 3
└── package.json



Despliegue y Ejecución Local
Demostración en Vivo
Accede a la versión en producción alojada en GitHub Pages:

👉 https://robertocrivera.github.io/teclado-game/

Ejecución en Entorno Local
Clona este repositorio:
git clone [https://github.com/robertocrivera/teclado-game.git](https://github.com/robertocrivera/teclado-game.git)
cd teclado-game


Inicia un servidor HTTP local (requerido para evitar bloqueos CORS en la carga de assets JSON e imágenes):
# Opción con npm:
npm start

# Opción con Python:
python -m http.server 8000




Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


