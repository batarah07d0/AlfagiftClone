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

const OrderList = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { fontSize: normalize(24, 0.6) }]}>
          Riwayat Pesanan
        </Text>

        <TouchableOpacity style={styles.cartButton}>
          <Icon name="cart-outline" size={iconSize} color="white" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Direct Transaction Card */}
        <TouchableOpacity style={styles.directTransactionCard}>
          <View style={styles.directTransactionLeft}>
            <View style={styles.storeIconContainer}>
              <Icon name="store" size={30} color="#A60000" />
            </View>
            <View style={styles.directTransactionContent}>
              <Text style={styles.directTransactionTitle}>
                Transaksi Langsung di Toko
              </Text>
              <Text style={styles.directTransactionSubtitle}>
                Transaksi kamu langsung ke toko tanpa lewat alfagift
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={iconSize} color="#0066B2" />
        </TouchableOpacity>

        {/* Empty Order State */}
        <View style={styles.emptyStateContainer}>
          <Image
            source={require("../assets/empty order.png")}
            style={styles.emptyStateImage}
            resizeMode="contain"
          />

          <Text style={styles.emptyStateTitle}>Belum ada transaksi</Text>

          <Text style={styles.emptyStateSubtitle}>
            Tunggu apa lagi, belanja sekarang
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate("Shopping")}
          >
            <Text style={styles.shopButtonText}>Yuk, Belanja</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Use the BottomNav component with Pesanan as the active screen */}
      <BottomNav
        navigation={navigation}
        activeScreen="OrderList"
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
  header: {
    backgroundColor: "#A60000",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },
  cartButton: {
    padding: 5,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFC107",
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
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  directTransactionCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  directTransactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  storeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFE0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  directTransactionContent: {
    flex: 1,
  },
  directTransactionTitle: {
    color: "#0066B2",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  directTransactionSubtitle: {
    color: "#666",
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyStateImage: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: "#0066B2",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderList;
