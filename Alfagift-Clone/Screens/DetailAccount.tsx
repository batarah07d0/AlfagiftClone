import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DetailAccount = ({ navigation }) => {
  // Get screen dimensions
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

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

  // Mock data for user profile
  const userData = {
    name: "Batara Hotdo Horas Simbolon",
    maritalStatus: "Belum Menikah",
    birthdate: "25 Oktober 2004",
    gender: "Laki-Laki",
    phone: "082252967142",
    email: "batarah07d0@gmail.com",
    emailVerified: true,
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
          Profil Saya
        </Text>
        <View style={{ width: 24 }} /> {/* For layout balance */}
      </View>

      {/* Profile Image Section */}
      <View
        style={{ backgroundColor: "#A60000", height: "5%", marginBottom: 50 }}
      ></View>
      <View style={styles.profileImageSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://static-content.alfagift.id/static/alfagift-app/profile_placeholder.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            <Icon name="camera" size={normalize(28)} color="white" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Profil Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Info Profil</Text>
            <TouchableOpacity>
              <View style={styles.editContainer}>
                <Icon name="pencil" size={smallIconSize} color="#0066B2" />
                <Text style={styles.editText}>Ubah</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            {/* Name */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nama</Text>
              <Text style={styles.infoValue}>{userData.name}</Text>
            </View>
            <View style={styles.separator} />

            {/* Marital Status */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status Pernikahan</Text>
              <Text style={styles.infoValue}>{userData.maritalStatus}</Text>
            </View>
            <View style={styles.separator} />

            {/* Birthdate */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tanggal Lahir</Text>
              <Text style={styles.infoValue}>{userData.birthdate}</Text>
              <Text style={styles.infoNote}>Tidak bisa diubah</Text>
            </View>
            <View style={styles.separator} />

            {/* Gender */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Jenis Kelamin</Text>
              <Text style={styles.infoValue}>{userData.gender}</Text>
              <Text style={styles.infoNote}>Tidak bisa diubah</Text>
            </View>
          </View>
        </View>

        {/* Contact Info Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Nomor HP & Email</Text>

          <View style={styles.infoCard}>
            {/* Phone Number */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nomor Handphone</Text>
              <Text style={styles.infoValue}>{userData.phone}</Text>
              <Text style={styles.infoNote}>Tidak bisa diubah</Text>
            </View>
            <View style={styles.separator} />

            {/* Email */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <View style={styles.emailContainer}>
                <Text style={styles.infoValue}>{userData.email}</Text>
                <TouchableOpacity>
                  <View style={styles.editContainer}>
                    <Icon name="pencil" size={smallIconSize} color="#0066B2" />
                    <Text style={styles.editText}>Ubah</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.verifiedContainer}>
                <Icon
                  name="check-circle"
                  size={smallIconSize}
                  color="#00A884"
                />
                <Text style={styles.verifiedText}>Sudah verifikasi</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Extra space at bottom for better scrolling experience */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    justifyContent: "space-between",
    gap: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  profileImageSection: {
    position: "absolute",
    top: 50,
    left: "38%",
    zIndex: 1,
  },
  profileImageContainer: {
    position: "relative",
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "white",
  },
  cameraIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#0066B2",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: "#0066B2",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    paddingVertical: 5,
  },
  infoLabel: {
    color: "#888",
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  infoNote: {
    color: "#888",
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  verifiedText: {
    color: "#00A884",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default DetailAccount;
