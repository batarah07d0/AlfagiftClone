import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
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
import BottomNav from "../Component/BottomNav"; // Import the new component

const HomePage = ({ navigation }) => {
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

  // Data banner
  const bannerData = [
    { id: "1", image: require("../assets/banner/pm_banner_250326_vDzL.png") },
    { id: "2", image: require("../assets/banner/pm_banner_250327_qIRz.jpg") }, // ganti dengan banner lain
    { id: "3", image: require("../assets/banner/pm_banner_250329_AelU.png") }, // ganti dengan banner lain
    { id: "4", image: require("../assets/banner/pm_banner_250329_UMFQ.png") }, // ganti dengan banner lain
    { id: "5", image: require("../assets/banner/pm_banner_250401_a6U9.png") }, // ganti dengan banner lain
  ];

  // State untuk banner aktif
  const [activeBanner, setActiveBanner] = useState(0);

  // Referensi untuk FlatList banner
  const bannerRef = useRef(null);

  // Icon sizes
  const iconSize = isTablet ? normalize(24, 0.5) : 22;
  const smallIconSize = isTablet ? normalize(20, 0.5) : 18;

  // Fungsi untuk menangani perubahan banner saat di-swipe
  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index >= 0 && index < bannerData.length) {
      setActiveBanner(index);
    }
  };

  // Fungsi untuk mengganti banner dengan indikator dot
  const scrollToBanner = (index) => {
    if (bannerRef.current) {
      bannerRef.current.scrollToIndex({
        index,
        animated: true,
      });
      setActiveBanner(index);
    }
  };

  // Render item banner
  const renderBanner = ({ item }) => {
    return (
      <Image
        source={item.image}
        style={styles.promoBannerImage}
        resizeMode="cover"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
        <LinearGradient
          colors={["#A60000", "#FFFFFF"]}
          style={styles.headerGradient}
        >
          {/* Address section */}
          <View style={styles.addressContainer}>
            <View>
              <Text
                style={[styles.addressLabel, { fontSize: normalize(14, 0.5) }]}
              >
                Alamat Pengiriman
              </Text>
              <View style={styles.locationRow}>
                <Text
                  style={[
                    styles.locationText,
                    { fontSize: normalize(22, 0.7) },
                  ]}
                >
                  Kost
                </Text>
                <Icon name="chevron-down" size={smallIconSize} color="white" />
              </View>
              <Text
                style={[styles.addressDetail, { fontSize: normalize(13, 0.5) }]}
              >
                Curung Sangereng, Kec. Klp. Dua, Kabup...
              </Text>
            </View>

            {/* Header Icons */}
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon
                  name="chat-processing-outline"
                  size={iconSize}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="bell-outline" size={iconSize} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButton}>
                <Icon name="cart-outline" size={iconSize} color="white" />
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>5</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.selfServiceContainer}>
              <TouchableOpacity style={styles.selfServiceButton}>
                <Text style={styles.selfServiceText}>Coba Self-service</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar]}>
              <Icon name="magnify" size={normalize(22, 0.5)} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Mau belanja apa?"
                placeholderTextColor="#999"
              />
              <Icon
                name="barcode-scan"
                size={normalize(22, 0.5)}
                color="#999"
              />
            </View>
            <TouchableOpacity style={styles.wishlistButton}>
              <Icon name="heart" size={normalize(24, 0.5)} color="#AAA" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* User Card */}
        <View style={styles.userCardContainer}>
          <View style={styles.userCard}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { fontSize: normalize(18, 0.6) }]}>
                Hai, Batara
              </Text>
              <TouchableOpacity style={styles.memberBadge}>
                <Icon name="crown" size={normalize(16, 0.5)} color="#FFD700" />
                <Text style={styles.memberText}>Bestie Member</Text>
                <Icon
                  name="chevron-right"
                  size={normalize(16, 0.5)}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* Points and Rewards */}
            <View style={styles.rewardsContainer}>
              <TouchableOpacity style={styles.rewardItem}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../assets/icon/Ic Poin.png")}
                    style={{ width: 20, height: 20, marginRight: 5 }}
                  />
                  <Text style={styles.pointAmount}>2.316</Text>
                </View>
                <Text style={styles.pointLabel}>Tukar A-Poin</Text>
              </TouchableOpacity>

              <View style={styles.rewardDivider} />

              <TouchableOpacity style={styles.rewardItem}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="ticket-percent-outline"
                    size={normalize(22, 0.5)}
                    color="#FFB300"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.pointAmount}>21</Text>
                </View>
                <Text style={styles.pointLabel}>Voucher</Text>
              </TouchableOpacity>

              <View style={styles.rewardDivider} />

              <TouchableOpacity style={styles.rewardItem}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="stamper"
                    size={normalize(22, 0.5)}
                    color="#FFB300"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.pointAmount}>0</Text>
                </View>
                <Text style={styles.pointLabel}>Stamp</Text>
              </TouchableOpacity>

              <View style={styles.rewardDivider} />

              <TouchableOpacity style={styles.rewardItem}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="star"
                    size={normalize(22, 0.5)}
                    color="#FFB300"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.pointAmount}>0</Text>
                </View>
                <Text style={styles.pointLabel}>Star</Text>
              </TouchableOpacity>
            </View>

            {/* Voucher Alert */}
            <View style={styles.voucherAlertContainer}>
              <Text style={styles.voucherAlertText}>
                9 voucher akan segera kedaluwarsa
              </Text>
            </View>

            <View style={styles.cardDivider} />

            {/* Connect Virgo and Barcode */}
            <View style={styles.bottomCardContainer}>
              <TouchableOpacity style={styles.virgoButton}>
                <View style={styles.checkCircle}>
                  <Icon name="check" size={normalize(16, 0.5)} color="white" />
                </View>
                <Text style={styles.virgoText}>Hubungkan Virgo</Text>
                <Icon
                  name="chevron-right"
                  size={normalize(16, 0.5)}
                  color="#0277BD"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.barcodeButton}>
                <Icon
                  name="barcode"
                  size={normalize(22, 0.5)}
                  color="#0277BD"
                />
                <Text style={styles.barcodeText}>Barcode Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Promo Banner dengan FlatList */}
        <View style={styles.promoBannerContainer}>
          <FlatList
            ref={bannerRef}
            data={bannerData}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            snapToInterval={Dimensions.get("window").width - 30}
            snapToAlignment="center"
            decelerationRate="fast"
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* Dots indicator */}
            <View style={styles.dotsContainer}>
              {bannerData.map((_, index) => (
                <TouchableOpacity
                  key={`dot-${index}`}
                  onPress={() => scrollToBanner(index)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.dot,
                      index === activeBanner ? styles.activeDot : {},
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* View All Promos */}
            <TouchableOpacity style={styles.viewAllPromos}>
              <Text style={styles.viewAllPromosText}>Lihat Semua Promo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add more content here similar to reference image */}
        <View style={{ height: 500 }} />
      </ScrollView>

      {/* Use the reusable Bottom Navigation component */}
      <BottomNav
        navigation={navigation}
        activeScreen="Home"
        normalize={normalize}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerGradient: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  addressLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  addressDetail: {
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 5,
  },
  cartButton: {
    padding: 5,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F9DA04",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#333",
    fontSize: 10,
    fontWeight: "bold",
  },
  selfServiceContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 20 : 30,
    right: 1,
    zIndex: 10,
  },
  selfServiceButton: {
    backgroundColor: "rgba(78, 78, 78, 0.44)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  selfServiceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  wishlistButton: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  userCardContainer: {
    paddingHorizontal: 15,
    marginTop: -10,
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    color: "#673AB7",
    fontWeight: "bold",
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(103, 58, 183, 0.1)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  memberText: {
    color: "#673AB7",
    marginHorizontal: 5,
    fontWeight: "500",
    fontSize: 12,
  },
  rewardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  rewardItem: {
    flex: 1,
    // marginLeft: 10,
  },
  pointCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFF9C4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  pointLetter: {
    color: "#F57F17",
    fontWeight: "bold",
    fontSize: 14,
  },
  pointAmount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 3,
  },
  pointLabel: {
    fontSize: 11,
    color: "#2b5d9e",
  },
  rewardDivider: {
    width: 1,
    marginHorizontal: 10,
    backgroundColor: "#666666",
  },
  voucherAlertContainer: {
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  voucherAlertText: {
    color: "#a10804",
    fontWeight: "bold",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#666666",
    marginBottom: 15,
  },
  bottomCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  virgoButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  virgoText: {
    color: "#2b5d9e",
    fontWeight: "500",
    marginRight: 5,
  },
  barcodeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  barcodeText: {
    color: "#2b5d9e",
    fontWeight: "500",
    marginLeft: 8,
  },
  promoBannerContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    position: "relative",
  },
  promoBannerImage: {
    width: Dimensions.get("window").width - 30, // Lebar layar dikurangi padding horizontal
    height: 150,
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DDD",
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#0277BD",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  viewAllPromos: {
    alignItems: "center",
    paddingVertical: 5,
  },
  viewAllPromosText: {
    color: "#0277BD",
    fontWeight: "bold",
  },
  // Bottom nav styles removed since we're using the component
});

export default HomePage;
