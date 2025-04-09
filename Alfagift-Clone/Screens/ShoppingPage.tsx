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
import BottomNav from "../Component/BottomNav"; // Import the reusable component
import ShoppingList from "../Component/ShoppingList"; // Import our ShoppingList component

const ShoppingPage = ({ navigation }) => {
  // Get screen dimensions
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [activeTab, setActiveTab] = useState("regular"); // 'regular' or 'favorite'

  // Sample product data
  const productData = [
    {
      id: 1,
      name: "Bango Kecap Manis Refill 700g",
      price: 26500,
      image: require("../assets/product/1_A09270039118_20250225140449031_base.jpg"),
      inStock: true,
      promo: "Gratis Product",
      quantity: 1,
    },
    {
      id: 2,
      name: "Pocari Sweat Minuman Isotonik Botol 500ml",
      price: 8500,
      image: require("../assets/product/1_A12630003575_20240801142839005_base.jpg"),
      inStock: true,
      quantity: 1,
    },
    {
      id: 3,
      name: "MyRoti Roti Tawar Funwari 8s",
      price: 14000,
      image: require("../assets/product/1_A10480000330_20240516163533790_base.jpg"),
      inStock: true,
      quantity: 2,
    },
    {
      id: 4,
      name: "Sania Minyak Goreng Pouch 2L",
      price: 38900,
      image: require("../assets/product/1_A09350002156_20240507154551859_base.jpg"),
      inStock: true,
      discount: 4,
      originalPrice: 40600,
      quantity: 1,
    },
  ];

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

  const iconSize = isTablet ? normalize(24, 0.5) : 22;
  const smallIconSize = isTablet ? normalize(20, 0.5) : 18;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#A60000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { fontSize: normalize(24, 0.6) }]}>
            Daftar Belanja
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("Search")}
            >
              <Icon name="magnify" size={iconSize} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Icon name="cart-outline" size={iconSize} color="white" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "regular" && styles.activeTab]}
            onPress={() => setActiveTab("regular")}
          >
            <Icon
              name="shopping-outline"
              size={smallIconSize}
              color={activeTab === "regular" ? "#0066B2" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                { fontSize: normalize(14, 0.5) },
                activeTab === "regular" && styles.activeTabText,
              ]}
            >
              Belanja Rutin
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "favorite" && styles.activeTab]}
            onPress={() => setActiveTab("favorite")}
          >
            <Icon
              name="heart-outline"
              size={smallIconSize}
              color={activeTab === "favorite" ? "#0066B2" : "#666"}
            />
            <Text
              style={[
                styles.tabText,
                { fontSize: normalize(14, 0.5) },
                activeTab === "favorite" && styles.activeTabText,
              ]}
            >
              Belanja Favorit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product Counter and Add All Button */}
        <View style={styles.productHeaderContainer}>
          <Text
            style={[styles.productCounter, { fontSize: normalize(14, 0.4) }]}
          >
            {productData.length} Produk tersedia
          </Text>
          <TouchableOpacity
            style={styles.addAllButton}
            onPress={() =>
              Alert.alert("Info", "Tambah semua produk ke keranjang")
            }
          >
            <Text style={[styles.addAllText, { fontSize: normalize(14, 0.4) }]}>
              Tambah Semua
            </Text>
            <View style={styles.plusIconContainer}>
              <Icon name="plus" size={16} color="#0066B2" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.content}>
          {activeTab === "regular" ? (
            <>
              {productData.map((product) => (
                <ShoppingList
                  key={product.id}
                  image={
                    product.image ||
                    require("../assets/product/1_A09270039118_20250225140449031_base.jpg")
                  }
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  inStock={product.inStock}
                  promo={product.promo}
                  quantity={product.quantity}
                  onAddToCart={(qty) =>
                    Alert.alert(
                      "Info",
                      `Menambahkan ${qty} ${product.name} ke keranjang`
                    )
                  }
                  normalize={normalize}
                />
              ))}
            </>
          ) : (
            <Text
              style={[styles.contentText, { fontSize: normalize(16, 0.5) }]}
            >
              Daftar Belanja Favorit Anda akan ditampilkan di sini
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Use the same BottomNav component but with Shopping as the active screen */}
      <BottomNav
        navigation={navigation}
        activeScreen="Shopping"
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
  header: {
    backgroundColor: "#A60000",
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#0066B2",
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#0066B2",
    fontWeight: "bold",
  },
  productHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
  },
  productCounter: {
    color: "#333",
    fontWeight: "500",
  },
  addAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addAllText: {
    color: "#0066B2",
    fontWeight: "bold",
    marginRight: 8,
  },
  plusIconContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#0066B2",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  contentText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
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
});

export default ShoppingPage;
