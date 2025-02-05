import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
      </View>

      {/* WebView debajo de la navbar */}
      <View style={styles.webViewContainer}>
        <AutoHeightWebView
          source={{ uri: "https://instalaciones.eternet.cc" }}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 40, // Ajusta la altura de la navbar
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  webViewContainer: {
    flex: 1, // Ocupa el espacio restante debajo de la navbar
  },
});
