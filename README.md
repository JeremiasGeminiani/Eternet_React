# App de Instaladores - React Native
Se diseñó una app de la web de Instaladores en React Native, para evitar el recargado constante del sitio, la idea sería que conserve las Cookies de logueo para facilitar el ingreso y la permanencia de la sesión en la aplicación y no tener que recurrir constantemente al navegador

Aunque, de momento solamente es la web ingresada en un Frame dentro de la Aplicación, la librería `react-native-autoheight-webview` y `react-native-webview` permiten la personalización del mismo.

Sumado a ello, existe la posibilidad de agregarle un AuthContext que, capture la cookie y la reutilice en la sesión, similar a muchas aplicaciones de autologueo en React Native.

Todavía se encuentra en Desarrollo, evitando las siguientes carácterísticas:

1. Auto-scroll constante,
2. Cierre de sesión automático al cerrar navegador,
3. Falta de Zoom,
4. Necesidad de credenciales constantemente

### Tipo de Tecnología:
Se está usando Expo Go desde un móvil `Android`, pero existe la posibilidad de ser utilizado también en `iOS`
