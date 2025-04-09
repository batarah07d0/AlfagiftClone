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
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AccountSettings = ({ navigation }) => {
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

  // Menu items with icons
  const menuItems = [
    {
      id: "password",
      title: "Ganti Password",
      icon: "key-variant",
      route: "ResetPassword",
      badge: null,
    },
    {
      id: "payment",
      title: "Pembayaran Terhubung",
      icon: "link-variant",
      route: "LinkedPayment",
      badge: "BARU!",
    },
    {
      id: "pin",
      title: "Buat PIN",
      icon: "lock",
      route: "CreatePIN",
      badge: null,
    },
    {
      id: "address",
      title: "Daftar Alamat",
      icon: "book-open-variant",
      route: "AddressList",
      badge: null,
    },
  ];

  // Function to handle menu item click
  const handleMenuItemClick = (route) => {
    navigation.navigate(route);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Show confirmation dialog
    Alert.alert("Tutup Akun", "Apakah Anda yakin ingin keluar dari akun ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Ya, Keluar",
        onPress: () => {
          // Navigate to Welcome page and reset navigation stack
          navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
          });
        },
      },
    ]);
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
          Pengaturan Akun
        </Text>
        <View style={{ width: 24 }} /> {/* For layout balance */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuItemClick(item.route)}
          >
            <View style={styles.menuIconContainer}>
              <Icon name={item.icon} size={iconSize} color="#0066B2" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text
                style={[styles.menuTitle, { fontSize: normalize(16, 0.5) }]}
              >
                {item.title}
              </Text>
            </View>
            <View style={styles.menuRight}>
              {item.badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
              <Icon name="chevron-right" size={iconSize} color="#999" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Section divider */}
        <View style={styles.divider}>
          <TouchableOpacity onPress={handleLogout}>
            <Text
              style={[styles.dividerText, { fontSize: normalize(18, 0.5) }]}
            >
              Tutup Akun
            </Text>
          </TouchableOpacity>
        </View>

        {/* Empty space for bottom padding */}
        <View style={{ height: 400 }} />
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  menuIconContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  menuTitle: {
    color: "#333",
    fontWeight: "400",
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "#A60000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  divider: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  dividerText: {
    color: "#A60000",
    fontWeight: "bold",
  },
});

export default AccountSettings;
