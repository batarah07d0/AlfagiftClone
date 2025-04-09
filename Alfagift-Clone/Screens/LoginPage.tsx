import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Demo credentials
const DEMO_PHONE = "081234567890";
const DEMO_PASSWORD = "password123";

const LoginPage = ({ navigation }) => {
  // Form state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle login attempt
  const handleLogin = () => {
    // Simple login check
    if (phone === DEMO_PHONE && password === DEMO_PASSWORD) {
      // Navigate to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      // Show error message
      Alert.alert("Login Gagal", "Nomor HP atau password salah");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView bounces={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Masuk</Text>
              <Text style={styles.headerSubtitle}>
                Masukkan nomor HP atau nomor kartu member untuk masuk ke
                aplikasi
              </Text>
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nomor HP/No. kartu member"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                outlineColor="#CCCCCC"
                activeOutlineColor="#2b5d9e"
                right={
                  <TextInput.Icon
                    icon="qrcode-scan"
                    color="#2b5d9e"
                    size={24}
                  />
                }
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                outlineColor="#CCCCCC"
                activeOutlineColor="#2b5d9e"
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? "eye-off" : "eye"}
                    color="#666666"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    size={24}
                  />
                }
              />
            </View>

            {/* Password Reset Section */}
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Lupa password Anda?</Text>
              <TouchableOpacity>
                <Text style={styles.resetPasswordText}>Reset Password</Text>
              </TouchableOpacity>
            </View>

            {/* Demo Login Info */}
            <View style={styles.demoContainer}>
              <Text style={styles.demoText}>Demo Login:</Text>
              <Text style={styles.demoText}>Phone: {DEMO_PHONE}</Text>
              <Text style={styles.demoText}>Password: {DEMO_PASSWORD}</Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: "#2b5d9e",
                },
              ]}
              onPress={handleLogin}
              disabled={!phone || !password}
            >
              <Text style={styles.loginButtonText}>Selanjutnya</Text>
            </TouchableOpacity>

            {/* Register Option */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Belum Punya Akun? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerLink}>Daftar Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#A60000",
    padding: 20,
    paddingBottom: 30,
  },
  backButton: {
    marginBottom: 15,
    padding: 5,
  },
  headerTextContainer: {
    marginLeft: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    height: 55,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: "#666666",
    marginBottom: 8,
    fontSize: 13,
  },
  resetPasswordText: {
    color: "#2b5d9e",
    fontWeight: "bold",
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 8,
    padding: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 192,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  demoContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  demoText: {
    color: "#666666",
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#333333",
    fontSize: 16,
  },
  registerLink: {
    color: "#2b5d9e",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginPage;
