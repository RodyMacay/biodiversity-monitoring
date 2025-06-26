# Sistema de Monitoreo Remoto de Biodiversidad

## Descripción

Plataforma integral para el monitoreo, análisis y conservación de la biodiversidad utilizando tecnologías de vanguardia como sensores remotos, inteligencia artificial y sistemas de información geográfica.

## Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React para aplicaciones web
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos y accesibles
- **Apollo Client** - Cliente GraphQL para React
- **Recharts** - Biblioteca de gráficos para React
- **Lucide React** - Iconos modernos
- **Clerk** - Autenticación y gestión de usuarios

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **Apollo Server** - Servidor GraphQL
- **GraphQL** - Lenguaje de consulta para APIs
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Tokens de autenticación
- **CORS** - Middleware para solicitudes de origen cruzado

## Estructura del Proyecto

```
biodiversity-monitoring/
├── backend/                 # Servidor backend
│   ├── models/             # Modelos de Mongoose
│   ├── schema/             # Esquemas y resolvers de GraphQL
│   ├── middleware/         # Middleware de autenticación
│   ├── utils/              # Utilidades
│   ├── index.js            # Servidor principal
│   ├── index-test.js       # Servidor de testing
│   ├── seedData.js         # Datos de ejemplo
│   └── package.json        # Dependencias del backend
├── frontend/               # Aplicación frontend
│   ├── src/
│   │   ├── app/            # Páginas de Next.js
│   │   ├── components/     # Componentes reutilizables
│   │   ├── graphql/        # Consultas GraphQL
│   │   └── lib/            # Utilidades y configuración
│   └── package.json        # Dependencias del frontend
└── README.md               # Este archivo
```

## Funcionalidades Implementadas

### Dashboard Principal
- Estadísticas generales del sistema
- Gráficos de distribución de especies por estado de conservación
- Gráficos de métodos de monitoreo por tipo
- Tendencias temporales de datos de monitoreo
- Lista de observaciones recientes

### Gestión de Especies
- Lista completa de especies registradas
- Información detallada de cada especie
- Estado de conservación
- Hábitat y distribución
- Funciones de búsqueda y filtrado

### Métodos de Monitoreo
- Catálogo de técnicas de monitoreo
- Clasificación por tipo (Sensores Remotos, GIS, IA, Molecular)
- Información de precisión y eficiencia
- Aplicaciones y equipamiento requerido

### Ubicaciones de Monitoreo
- Mapa de sitios de monitoreo
- Información geográfica detallada
- Estado de protección
- Ecosistemas asociados

### Datos de Monitoreo
- Registros de observaciones
- Vinculación con especies, métodos y ubicaciones
- Verificación de calidad de datos
- Análisis temporal y espacial

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- MongoDB (opcional para testing)

### Instalación

1. **Extraer el proyecto**
   ```bash
   tar -xzf biodiversity-monitoring-project.tar.gz
   cd biodiversity-monitoring
   ```

2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configurar el Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuración de Variables de Entorno

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/biodiversity-monitoring
JWT_SECRET=tu-jwt-secret-key
PORT=4000
CLERK_SECRET_KEY=tu-clerk-secret-key
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dGlnaHQtYnVmZmFsby04MC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=tu-clerk-secret-key
```

### Ejecución

#### Modo Desarrollo

1. **Iniciar el Backend**
   ```bash
   cd backend
   # Para testing sin MongoDB
   node index-test.js
   
   # Para producción con MongoDB
   npm run dev
   ```

2. **Iniciar el Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Backend GraphQL: http://localhost:4000/graphql

#### Modo Testing
Para testing rápido sin configurar MongoDB, usar:
```bash
cd backend
node index-test.js
```

Esto iniciará el servidor con datos simulados en memoria.

## Características Destacadas

### Diseño y UX
- **Interfaz completamente en español**
- **Diseño responsivo** para desktop y móvil
- **Componentes modernos** con shadcn/ui
- **Tema verde** relacionado con la naturaleza
- **Navegación intuitiva** con sidebar y breadcrumbs

### Arquitectura
- **Separación clara** entre frontend y backend
- **API GraphQL** para consultas eficientes
- **Autenticación robusta** con Clerk
- **Base de datos flexible** con MongoDB
- **Código TypeScript** para mayor confiabilidad

### Datos y Visualización
- **Gráficos interactivos** con Recharts
- **Datos de ejemplo** realistas
- **Filtros y búsqueda** avanzados
- **Exportación de datos** (preparado para implementar)

## Próximos Pasos

### Funcionalidades Pendientes
1. **Autenticación completa** - Configurar Clerk con claves reales
2. **Base de datos** - Conectar con MongoDB en producción
3. **Mapas interactivos** - Integrar con Mapbox o Google Maps
4. **Exportación de datos** - PDF, Excel, CSV
5. **Notificaciones** - Sistema de alertas en tiempo real
6. **API externa** - Integración con bases de datos de biodiversidad
7. **Machine Learning** - Modelos de predicción y clasificación

### Mejoras Técnicas
1. **Testing automatizado** - Jest, Cypress
2. **CI/CD** - GitHub Actions
3. **Monitoreo** - Logging y métricas
4. **Optimización** - Caching, lazy loading
5. **Seguridad** - Rate limiting, validación de entrada

## Soporte y Documentación

### Recursos Útiles
- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Clerk Authentication](https://clerk.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Estructura de Datos

#### Especies
```typescript
interface Species {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  conservationStatus: ConservationStatus;
  habitat: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Métodos de Monitoreo
```typescript
interface MonitoringMethod {
  id: string;
  name: string;
  type: MethodType;
  description: string;
  applications: string[];
  accuracy: number;
  costEfficiency: CostEfficiency;
  equipment: string[];
}
```

#### Datos de Monitoreo
```typescript
interface MonitoringData {
  id: string;
  species: Species;
  method: MonitoringMethod;
  location: Location;
  date: Date;
  value: number;
  unit: string;
  notes: string;
  verified: boolean;
}
```

## Licencia

Este proyecto fue desarrollado como demostración de un sistema de monitoreo de biodiversidad. Todos los datos son simulados y con fines educativos.

---

**Desarrollado con ❤️ para la conservación de la biodiversidad**

