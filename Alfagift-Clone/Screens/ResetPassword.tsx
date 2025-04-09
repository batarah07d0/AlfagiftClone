import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ResetPassword = ({ navigation }) => {
  // Get screen dimensions
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    hasNumber: false,
    hasMixedCase: false,
  });

  // Check password against criteria
  useEffect(() => {
    setPasswordCriteria({
      length: newPassword.length >= 8 && newPassword.length <= 32,
      hasNumber: /\d/.test(newPassword),
      hasMixedCase: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
    });
  }, [newPassword]);

  // Update dimensions when screen size changes (rotation)
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });

    return () => subscription.remove();
  }, []);

  // Calculate responsive sizes based on screen width
  const { width, height } = dimensions;
  const isTablet = width > 768 || height > 768;

  // Function to normalize font size across different devices
  const normalize = (size, factor = 0.5) => {
    // Phone base width for scaling calculation
    const phoneBaseWidth = 375;

    // Tablet has different base width
    const tabletBaseWidth = 768;

    // Use different scales for phone vs tablet
    const baseWidth = isTablet ? tabletBaseWidth : phoneBaseWidth;

    // For tablets, we scale less aggressively to prevent fonts being too large
    const scaleFactor = isTablet ? factor * 0.5 : factor;

    // Calculate scale based on device width and apply the factor
    const scale = width / baseWidth;
    const scaledSize = size + (scale - 1) * size * scaleFactor;

    // Ensure we don't go below original size and limit max size for tablets
    const finalSize = Math.max(
      size,
      isTablet ? Math.min(scaledSize, size * 1.3) : scaledSize
    );

    // Round to nearest pixel
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(finalSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(finalSize));
    }
  };

  const iconSize = normalize(24, 0.5);
  const smallIconSize = normalize(20, 0.5);

  // Handle save button press
  const handleSave = () => {
    // Verify all criteria are met
    if (
      !passwordCriteria.length ||
      !passwordCriteria.hasNumber ||
      !passwordCriteria.hasMixedCase
    ) {
      Alert.alert(
        "Validasi Gagal",
        "Password baru tidak memenuhi kriteria keamanan."
      );
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Validasi Gagal",
        "Password baru dan konfirmasi password tidak cocok."
      );
      return;
    }

    // Here you would typically call an API to change the password
    Alert.alert("Sukses", "Password berhasil diubah.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  // Check if save button should be enabled
  const isSaveEnabled = () => {
    return (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      passwordCriteria.length &&
      passwordCriteria.hasNumber &&
      passwordCriteria.hasMixedCase &&
      newPassword === confirmPassword
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={iconSize} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: normalize(22, 0.6) }]}>
          Ganti Password
        </Text>
        <View style={{ width: 24 }} /> {/* For layout balance */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Old Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password lama"
            placeholderTextColor="#999"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowOldPassword(!showOldPassword)}
          >
            <Icon
              name={showOldPassword ? "eye-off" : "eye"}
              size={iconSize}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* New Password Input */}
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <TextInput
            style={styles.input}
            placeholder="Password baru"
            placeholderTextColor="#999"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Icon
              name={showNewPassword ? "eye-off" : "eye"}
              size={iconSize}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Password Criteria */}
        <View style={styles.criteriaContainer}>
          <View style={styles.criteriaItem}>
            <Icon
              name={passwordCriteria.length ? "check-circle" : "circle-outline"}
              size={smallIconSize}
              color={passwordCriteria.length ? "#999" : "#999"}
            />
            <Text style={styles.criteriaText}>
              Minimum 8 karakter (maksimum 32)
            </Text>
          </View>

          <View style={styles.criteriaItem}>
            <Icon
              name={
                passwordCriteria.hasNumber ? "check-circle" : "circle-outline"
              }
              size={smallIconSize}
              color={passwordCriteria.hasNumber ? "#999" : "#999"}
            />
            <Text style={styles.criteriaText}>Terdapat minimum 1 angka</Text>
          </View>

          <View style={styles.criteriaItem}>
            <Icon
              name={
                passwordCriteria.hasMixedCase
                  ? "check-circle"
                  : "circle-outline"
              }
              size={smallIconSize}
              color={passwordCriteria.hasMixedCase ? "#999" : "#999"}
            />
            <Text style={styles.criteriaText}>
              Terdapat minimum 1 huruf besar dan 1 huruf kecil
            </Text>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <TextInput
            style={styles.input}
            placeholder="Konfirmasi password baru"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={iconSize}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          !isSaveEnabled() && styles.saveButtonDisabled,
        ]}
        onPress={handleSave}
        disabled={!isSaveEnabled()}
      >
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#A60000",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    paddingLeft: 16,
    textAlign: "left",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  criteriaContainer: {
    marginTop: 16,
  },
  criteriaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  criteriaText: {
    marginLeft: 8,
    color: "#777",
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: "#A60000",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: "#999",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPassword;
