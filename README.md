Zoo DALLY: Plataforma de Gestión y Experiencia Digital para Zoológicos

Bienvenido al repositorio de Zoo DALLY, una aplicación web Full Stack diseñada para modernizar la gestión interna de un zoológico y mejorar la experiencia del usuario.

Este proyecto fue desarrollado utilizando un stack tecnológico moderno y robusto, ideal para aplicaciones escalables y en tiempo real.

Stack Tecnológico
Componente	Tecnología	Propósito
Frontend	React (JavaScript)	Interfaz de usuario dinámica y modular.
Backend/BaaS	Supabase	Backend-as-a-Service, incluyendo: Base de datos (PostgreSQL), Autenticación y Almacenamiento de archivos (como imágenes de animales).

Características Principales
Zoo DALLY se divide en dos grandes módulos con funcionalidades específicas:

1. Módulo de Usuario / Visitante (Frontend Público)
Diseñado para ser intuitivo y rápido, permitiendo a los visitantes interactuar con el zoológico de forma digital:

Registro y Autenticación: Los usuarios pueden crear cuentas de forma segura (gestionado por Supabase Auth).

Compra de Entradas: Flujo para la adquisición de boletos.

Base de Datos de Animales: Acceso a la lista completa de animales del zoológico, con información detallada y actualizada en tiempo real.

Postulación a Voluntario: Formulario para que los interesados envíen su solicitud para unirse al equipo.

Contacto: Envío de mensajes de consulta al personal del zoológico.

2. Módulo de Administración (Dashboard Privado)
Una consola centralizada accesible solo para cuentas con rol de administrador, que permite la gestión completa de la plataforma y su contenido:

Categoría	Funcionalidades del Dashboard
Contenido	Gestión de la base de datos de Animales (CRUD) y actualización de las FAQs.
Atención	Revisión y respuesta a mensajes de Contactos. Análisis y cambio de estado de las postulaciones de Voluntarios.
Comercial	Visualización del historial y detalle de Tickets comprados por los usuarios.
Seguridad	Gestión de Perfiles de usuario y actualización de roles de acceso.

⚙️ Instalación y Configuración
Sigue estos pasos para levantar el proyecto en tu entorno local.

Prerrequisitos
Node.js (v14 o superior)

Una cuenta y proyecto activo en Supabase.

1. Clonar el Repositorio
Bash

2. Configuración de Entorno (Supabase)
Crea un archivo llamado .env.local en la raíz del proyecto y añade tus credenciales de Supabase:


REACT_APP_SUPABASE_URL="[Tu Project URL de Supabase]"

REACT_APP_SUPABASE_ANON_KEY="[Tu clave anon de Supabase]"

3. Instalación de Dependencias e Inicio


