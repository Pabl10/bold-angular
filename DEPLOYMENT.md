# 🚀 Despliegue en GitHub Pages

Este documento explica cómo configurar el despliegue automático de la aplicación Angular en GitHub Pages.

## 📋 Configuración Requerida

### 1. **Habilitar GitHub Pages en el repositorio**

1. Ve a la configuración del repositorio en GitHub
2. Navega a la sección "Pages" en el menú lateral
3. En "Source", selecciona "GitHub Actions"
4. Guarda la configuración

### 2. **Configuración Automática**

El proyecto ya incluye:

- ✅ **Workflow de GitHub Actions** (`.github/workflows/deploy.yml`)
- ✅ **Configuración de Angular** para GitHub Pages
- ✅ **Scripts de build** optimizados
- ✅ **Archivos de redirección** para SPA routing

## 🔧 Configuración Técnica

### **Angular Configuration**

```json
"github-pages": {
  "baseHref": "/bold-angular/",
  "deployUrl": "/bold-angular/",
  "outputHashing": "all"
}
```

### **GitHub Actions Workflow**

El workflow se ejecuta automáticamente cuando:
- Se hace push a la rama `main`
- Se crea un Pull Request a `main`

### **Scripts Disponibles**

```bash
# Build para GitHub Pages
npm run build:github-pages

# Build normal
npm run build

# Desarrollo local
npm start
```

## 🌐 URLs de Despliegue

Una vez configurado, la aplicación estará disponible en:

- **GitHub Pages**: `https://pabl10.github.io/bold-angular/`
- **Repositorio**: `https://github.com/Pabl10/bold-angular`

## 🔄 Proceso de Despliegue

1. **Push a main** → Trigger automático del workflow
2. **Build** → Compilación con configuración de GitHub Pages
3. **Deploy** → Subida automática a GitHub Pages
4. **Live** → Aplicación disponible en la URL

## 🛠️ Solución de Problemas

### **Error: "Page not found"**
- Verificar que GitHub Pages esté habilitado
- Comprobar que el workflow se ejecutó correctamente
- Revisar los logs de GitHub Actions

### **Error: "Assets not loading"**
- Verificar la configuración de `baseHref`
- Comprobar que los assets estén en la carpeta correcta

### **Error: "Routing not working"**
- Verificar que los archivos `404.html` e `index.html` estén en `public/`
- Comprobar la configuración de Angular Router

## 📝 Notas Importantes

- El despliegue es **automático** en cada push a `main`
- Los archivos se generan en la rama `gh-pages`
- La configuración de `baseHref` es crucial para el funcionamiento
- Los archivos de redirección permiten el routing de SPA

## 🔗 Enlaces Útiles

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [GitHub Actions for Pages](https://github.com/peaceiris/actions-gh-pages)
