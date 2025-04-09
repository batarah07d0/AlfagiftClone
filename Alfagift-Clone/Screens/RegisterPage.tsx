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

const RegisterPage = ({ navigation }) => {
  // Form state
  const [phone, setPhone] = useState("");

  // Handle registration attempt
  const handleRegister = () => {
    // Check if phone number is valid
    if (phone.length >= 10) {
      // Show success message and navigate to Home screen
      Alert.alert(
        "Registrasi Berhasil",
        "Kode OTP telah dikirim ke nomor Anda (simulasi).",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to Home screen
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            },
          },
        ]
      );
    } else {
      // Show error message
      Alert.alert("Registrasi Gagal", "Nomor HP tidak valid");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Daftar</Text>
                <Text style={styles.headerSubtitle}>
                  Masukkan nomor HP untuk registrasi aplikasi
                </Text>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <View style={styles.formContent}>
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

                {/* OTP Info Text */}
                <View style={styles.otpInfoContainer}>
                  <Text style={styles.otpInfoText}>
                    Kami akan mengirimkan kode OTP via WhatsApp/SMS untuk
                    memverifikasi nomor Anda
                  </Text>
                </View>
              </View>

              {/* Button and Login Link Section */}
              <View style={styles.buttonAndLoginContainer}>
                {/* Register Button */}
                <TouchableOpacity
                  style={[
                    styles.registerButton,
                    { backgroundColor: "#999999" },
                  ]}
                  onPress={handleRegister}
                  disabled={!phone}
                >
                  <Text style={styles.registerButtonText}>Selanjutnya</Text>
                </TouchableOpacity>

                {/* Login Option */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Sudah punya akun? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.loginLink}>Masuk Sekarang</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#A60000",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 30,
    paddingBottom: 30,
  },
  backButton: {
    marginBottom: 10,
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
  formContent: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    height: 55,
    fontSize: 16,
  },
  otpInfoContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  otpInfoText: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 20,
  },
  buttonAndLoginContainer: {
    width: "100%",
    paddingTop: 350,
  },
  registerButton: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#333333",
    fontSize: 16,
  },
  loginLink: {
    color: "#2b5d9e",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterPage;
