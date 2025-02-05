# **App de Instaladores - React Native**  

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb270ad4-d786-41f8-bc72-ce79cdfd809d" alt="Logo" width="250"/>
</p>  

Se ha desarrollado una aplicación en **React Native** basada en la web de Instaladores, con el objetivo de mejorar la experiencia del usuario y evitar la recarga constante del sitio.  

La idea principal es que la aplicación conserve las **cookies de inicio de sesión**, permitiendo a los usuarios **mantenerse autenticados sin necesidad de recurrir continuamente al navegador**.  

### **Estado actual del desarrollo**  
Por ahora, la app funciona como un **frame** dentro de la aplicación, cargando la web mediante las librerías [`react-native-autoheight-webview`](https://www.npmjs.com/package/react-native-autoheight-webview) y [`react-native-webview`](https://github.com/react-native-webview/react-native-webview), las cuales permiten personalizar la visualización y mejorar la integración.  

A futuro, se contempla la incorporación de un **AuthContext**, que capturará y reutilizará la cookie de sesión, similar a los sistemas de **autologin** en React Native.  

### **Desafíos y mejoras en desarrollo**  
Actualmente, se está trabajando para solucionar los siguientes aspectos:  

- **Auto-scroll** constante que afecta la navegación.  
- **Cierre de sesión automático** al cerrar la aplicación.  
- **Falta de zoom**, lo que dificulta la visualización en dispositivos móviles.  
- **Solicitud frecuente de credenciales**, reduciendo la comodidad del usuario.  

### **Tecnología utilizada**  
El desarrollo se está llevando a cabo con **Expo Go** en dispositivos **Android**, aunque la aplicación tiene potencial para ser utilizada en **iOS** con los ajustes correspondientes.  
