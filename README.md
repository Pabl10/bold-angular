# Bold Dashboard - Angular

Dashboard de transacciones desarrollado en Angular 17 para la gestión y monitoreo de transacciones financieras.

## 🚀 Características

- **Dashboard Interactivo**: Visualización completa de transacciones con filtros avanzados
- **Panel Lateral de Detalles**: Modal lateral con información detallada de cada transacción
- **Filtros Dinámicos**: Filtrado por fecha, tipo de transacción y búsqueda de texto
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Material Design**: Interfaz moderna con Angular Material
- **Estado Reactivo**: Gestión de estado con RxJS y BehaviorSubject

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **SASS/SCSS** - Preprocesador CSS

### Herramientas de Desarrollo
- **Angular CLI** - Herramientas de desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Git** - Control de versiones

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios y modelos centrales
│   │   ├── models/             # Interfaces y tipos TypeScript
│   │   └── services/           # Servicios de API y estado
│   ├── features/               # Módulos por funcionalidad
│   │   ├── transactions/       # Módulo de transacciones
│   │   │   ├── components/     # Componentes específicos
│   │   │   └── services/       # Servicios del módulo
│   │   └── shared/            # Componentes compartidos
│   ├── shared/                # Recursos compartidos
│   │   ├── pipes/             # Pipes personalizados
│   │   ├── directives/        # Directivas personalizadas
│   │   └── styles/            # Estilos globales
│   └── app.component.*        # Componente raíz
├── assets/                    # Recursos estáticos
└── environments/              # Configuraciones de entorno
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Angular CLI

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd bold-angular
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

4. **Ejecutar en modo desarrollo**
```bash
ng serve
```

5. **Abrir en el navegador**
```
http://localhost:4200
```

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
ng serve                    # Servidor de desarrollo
ng serve --port 4201        # Puerto personalizado

# Construcción
ng build                    # Build de producción
ng build --configuration development  # Build de desarrollo

# Testing
ng test                     # Ejecutar tests unitarios
ng e2e                      # Ejecutar tests e2e

# Linting
ng lint                     # Verificar código con ESLint

# Generación de código
ng generate component <name>    # Generar componente
ng generate service <name>      # Generar servicio
ng generate pipe <name>         # Generar pipe
```

## 🎨 Componentes Principales

### Dashboard
- **SalesCard**: Tarjeta de resumen de ventas
- **DateFilters**: Filtros de fecha (Hoy, Esta semana, Octubre)
- **SearchBar**: Barra de búsqueda de transacciones
- **FilterButton**: Botón de filtros por tipo de transacción
- **TransactionsTable**: Tabla de transacciones con panel lateral

### Panel Lateral
- **TransactionDetailModal**: Modal con detalles de transacción
- Información general, de pago y financiera
- Soporte para deducciones Bold
- Cálculo de total neto

## 🔧 Servicios

### TransactionStateService
- Gestión de estado global de transacciones
- Filtros reactivos con RxJS
- Persistencia en localStorage
- Comunicación entre componentes

### TransactionApiService
- Comunicación con API REST
- Manejo de errores y reintentos
- Interceptores HTTP
- Transformación de datos

### FilterService
- Lógica de filtrado de transacciones
- Filtros por fecha, tipo y búsqueda
- Cálculo de estadísticas
- Validación de filtros

## 🎯 Funcionalidades

### Filtros
- **Por Fecha**: Hoy, Esta semana, Octubre
- **Por Tipo**: Terminal, Link de pago, Todos
- **Búsqueda**: Por ID, método de pago, referencia, monto, estado

### Transacciones
- **Visualización**: Tabla con columnas organizadas
- **Detalles**: Panel lateral con información completa
- **Estados**: Exitoso, Rechazado con iconos
- **Métodos de Pago**: PSE, Bancolombia, etc.
- **Deducciones**: Cálculo automático de deducciones Bold

### UI/UX
- **Material Design**: Componentes consistentes
- **Responsive**: Adaptable a móviles y tablets
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Navegación por teclado

## 📱 Responsive Design

- **Desktop**: Layout completo con panel lateral
- **Tablet**: Adaptación de columnas y espaciado
- **Mobile**: Navegación optimizada y componentes apilados

## 🎨 Estilos

### SASS/SCSS
- Variables globales para colores y tipografía
- Mixins para reutilización de estilos
- Anidamiento para organización
- Importaciones modulares

### Temas
- **Colores**: Paleta Bold con gradientes
- **Tipografía**: Montserrat para títulos
- **Espaciado**: Sistema de 8px
- **Sombras**: Elevación Material Design

## 🔒 Seguridad

- Validación de datos en frontend
- Sanitización de inputs
- Manejo seguro de errores
- Headers de seguridad HTTP

## 🚀 Despliegue

### Build de Producción
```bash
ng build --configuration production
```

### Variables de Entorno
```bash
# .env
API_URL=https://api.bold.com
ENVIRONMENT=production
```

## 📊 Monitoreo

- Logs de errores en consola
- Métricas de rendimiento
- Tracking de eventos de usuario
- Alertas de errores críticos

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo**: Equipo Bold
- **Diseño**: UX/UI Team
- **Producto**: Product Management

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contactar al equipo de desarrollo.

---

**Bold Dashboard Angular** - Dashboard de transacciones moderno y eficiente 🚀