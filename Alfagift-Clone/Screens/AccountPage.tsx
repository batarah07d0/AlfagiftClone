import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNav from "../Component/BottomNav";

const AccountPage = ({ navigation }) => {
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
  const mediumIconSize = normalize(22, 0.5);

  // Mock data for user profile
  const userData = {
    name: "Batara Hotdo Horas Simbolon",
    phone: "082252967142",
    membershipType: "BESTIE",
    memberSince: "28 Feb 2024",
  };

  // Mock data for menu items
  const menuItems = [
    {
      title: "Pengaturan Akun",
      subtitle: "Ganti Password, Ganti PIN & Daftar Alamat",
      icon: "cog",
      route: "AccountSettings",
    },
    {
      title: "Rating & Ulasan",
      subtitle: "",
      icon: "star",
      route: "Ratings",
      badge: 4,
    },
    {
      title: "Atur Notifikasi",
      subtitle: "",
      icon: "bell",
      route: "Notifications",
    },
    {
      title: "Ajak Teman Pakai Alfagift",
      subtitle: "",
      icon: "account-multiple",
      route: "ReferFriend",
    },
    {
      title: "Alfagift Affiliate",
      subtitle: "",
      icon: "share-variant",
      route: "Affiliate",
      badge: "BARU!",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Background gradient for the header section */}
        <LinearGradient
          colors={["#A60000", "#FFFFFF"]}
          style={styles.headerGradient}
        >
          <Text style={[styles.headerTitle, { fontSize: normalize(24, 0.6) }]}>
            Akun
          </Text>
          {/* User Profile Card */}
          <View style={styles.profileCardContainer}>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.profileInfo}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{
                        uri: "https://static-content.alfagift.id/static/alfagift-app/profile_placeholder.png",
                      }}
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.userInfo}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.userName,
                        { fontSize: normalize(18, 0.5) },
                      ]}
                    >
                      {userData.name}
                    </Text>
                    <Text
                      style={[
                        styles.userPhone,
                        { fontSize: normalize(14, 0.5) },
                      ]}
                    >
                      {userData.phone}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("DetailAccount")}
                >
                  <Icon name="chevron-right" size={30} color="#0066B2" />
                </TouchableOpacity>
              </View>

              {/* Membership Banner */}
              <TouchableOpacity style={styles.membershipBanner}>
                <View style={styles.membershipInfo}>
                  <Image
                    source={require("../assets/icon/Ic GWP 80.svg")}
                    style={styles.membershipIcon}
                  />
                  <View>
                    <Text
                      style={[
                        styles.membershipType,
                        { fontSize: normalize(16, 0.5) },
                      ]}
                    >
                      {userData.membershipType}
                    </Text>
                    <Text
                      style={[
                        styles.memberSince,
                        { fontSize: normalize(12, 0.5) },
                      ]}
                    >
                      Anggota sejak {userData.memberSince}
                    </Text>
                  </View>
                </View>
                <View style={styles.membershipArrow}>
                  <Icon
                    name="arrow-right-circle"
                    size={mediumIconSize}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              {/* Loyalty Program Icons */}
              <View style={styles.loyaltyContainer}>
                <TouchableOpacity style={styles.loyaltyItem}>
                  <View style={styles.loyaltyIconContainer}>
                    <Text style={styles.loyaltyIconText}>P</Text>
                  </View>
                  <Text
                    style={[
                      styles.loyaltyText,
                      { fontSize: normalize(12, 0.5) },
                    ]}
                  >
                    A-Poin
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loyaltyItem}>
                  <View style={styles.loyaltyIconContainer}>
                    <Icon name="star" size={smallIconSize} color="#FFB300" />
                  </View>
                  <Text
                    style={[
                      styles.loyaltyText,
                      { fontSize: normalize(12, 0.5) },
                    ]}
                  >
                    Alfa Star
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loyaltyItem}>
                  <View style={styles.loyaltyIconContainer}>
                    <Icon name="stamper" size={smallIconSize} color="#FFB300" />
                  </View>
                  <Text
                    style={[
                      styles.loyaltyText,
                      { fontSize: normalize(12, 0.5) },
                    ]}
                  >
                    Stamp
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loyaltyItem}>
                  <View style={styles.loyaltyIconContainer}>
                    <Icon
                      name="ticket-percent"
                      size={smallIconSize}
                      color="#FFB300"
                    />
                  </View>
                  <Text
                    style={[
                      styles.loyaltyText,
                      { fontSize: normalize(12, 0.5) },
                    ]}
                  >
                    Voucher
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Missions Card */}
        <View style={styles.missionCardContainer}>
          <View style={styles.missionCard}>
            <View style={styles.missionBanner}>
              <Text
                style={[
                  styles.missionBannerText,
                  { fontSize: normalize(14, 0.5) },
                ]}
              >
                Shopping Mission
              </Text>
            </View>

            <View style={styles.missionsContainer}>
              {/* Daily Mission */}
              <View style={styles.missionColumn}>
                <View style={styles.missionHeader}>
                  <Icon name="target" size={mediumIconSize} color="white" />
                  <Text
                    style={[
                      styles.missionTitle,
                      { fontSize: normalize(16, 0.5) },
                    ]}
                  >
                    Misi Harian
                  </Text>
                </View>
                <Text
                  style={[
                    styles.missionProgress,
                    { fontSize: normalize(14, 0.5) },
                  ]}
                >
                  0/2 <Text style={styles.missionText}>misi selesai</Text>
                </Text>
                <View style={styles.missionTimer}>
                  <Text
                    style={[
                      styles.missionTimerText,
                      { fontSize: normalize(14, 0.5) },
                    ]}
                  >
                    Sisa waktu
                  </Text>
                  <View style={styles.timeContainer}>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>00</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>17</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>18</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Tiered Mission */}
              <View style={styles.missionColumn}>
                <View style={styles.missionHeader}>
                  <Icon name="flask" size={mediumIconSize} color="white" />
                  <Text
                    style={[
                      styles.missionTitle,
                      { fontSize: normalize(16, 0.5) },
                    ]}
                  >
                    Misi Bertingkat
                  </Text>
                </View>
                <Text
                  style={[
                    styles.missionProgress,
                    { fontSize: normalize(14, 0.5) },
                  ]}
                >
                  0/9 <Text style={styles.missionText}>misi selesai</Text>
                </Text>
                <View style={styles.missionTimer}>
                  <Text
                    style={[
                      styles.missionTimerText,
                      { fontSize: normalize(14, 0.5) },
                    ]}
                  >
                    Sisa waktu
                  </Text>
                  <View style={styles.timeContainer}>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>00</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>17</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                      <Text style={styles.timeText}>18</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.menuItemLast,
            ]}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.menuIcon}>
              <Icon name={item.icon} size={mediumIconSize} color="#0066B2" />
            </View>
            <View style={styles.menuContent}>
              <View style={styles.menuTitleContainer}>
                <Text
                  style={[styles.menuTitle, { fontSize: normalize(16, 0.5) }]}
                >
                  {item.title}
                </Text>
                {item.badge && (
                  <View
                    style={[
                      styles.menuBadge,
                      typeof item.badge === "string"
                        ? styles.menuBadgeText
                        : styles.menuBadgeNumber,
                    ]}
                  >
                    <Text style={styles.menuBadgeContent}>{item.badge}</Text>
                  </View>
                )}
              </View>
              {item.subtitle ? (
                <Text
                  style={[
                    styles.menuSubtitle,
                    { fontSize: normalize(12, 0.5) },
                  ]}
                >
                  {item.subtitle}
                </Text>
              ) : null}
            </View>
            <Icon name="chevron-right" size={mediumIconSize} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Extra space at bottom to ensure all content is visible above bottom nav */}
        <View style={{ height: 70 }} />
      </ScrollView>

      {/* Use the BottomNav component with Account as the active screen */}
      <BottomNav
        navigation={navigation}
        activeScreen="Account"
        normalize={normalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerGradient: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  profileCardContainer: {
    paddingHorizontal: 5,
    paddingTop: 16,
    marginTop: -10,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 12,
    // overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingRight: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  userPhone: {
    color: "#666666",
  },
  editButton: {
    padding: 8,
  },
  membershipBanner: {
    backgroundColor: "#8359B0",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  membershipInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  membershipIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  membershipType: {
    color: "white",
    fontWeight: "bold",
  },
  memberSince: {
    color: "white",
    opacity: 0.8,
  },
  membershipArrow: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 4,
  },
  loyaltyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  loyaltyItem: {
    alignItems: "center",
  },
  loyaltyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF8E1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFE082",
  },
  loyaltyIconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFC107",
  },
  loyaltyText: {
    color: "#0066B2",
    fontWeight: "500",
  },
  missionCardContainer: {
    paddingHorizontal: 18,
    backgroundColor: "white",
    paddingTop: 5,
  },
  missionCard: {
    backgroundColor: "#da0000",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  missionBanner: {
    backgroundColor: "#FFC107",
    paddingVertical: 3,
    paddingHorizontal: 16,
    alignSelf: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  missionBannerText: {
    fontWeight: "bold",
    color: "#333333",
  },
  missionsContainer: {
    flexDirection: "row",
    paddingBottom: 16,
  },
  missionColumn: {
    flex: 1,
    padding: 16,
    alignItems: "flex-start",
  },
  missionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  missionTitle: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  missionProgress: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
  },
  missionText: {
    fontWeight: "normal",
    fontSize: 14,
  },
  missionTimer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  missionTimerText: {
    color: "white",
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBox: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  timeText: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 10,
  },
  timeSeparator: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 2,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitle: {
    color: "#333333",
    fontWeight: "500",
  },
  menuSubtitle: {
    color: "#666666",
    marginTop: 4,
  },
  menuBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuBadgeNumber: {
    backgroundColor: "#E01E26",
    minWidth: 24,
    height: 24,
    borderRadius: 12,
  },
  menuBadgeText: {
    backgroundColor: "#E01E26",
    paddingHorizontal: 8,
  },
  menuBadgeContent: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default AccountPage;
