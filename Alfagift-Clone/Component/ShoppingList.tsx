import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Props interface for type checking
interface ShoppingListProps {
  image: any; // Image source
  name: string;
  price: number;
  originalPrice?: number; // Optional for discounted items
  discount?: number; // Optional discount percentage
  inStock: boolean; // Is the product in stock?
  promo?: string; // Optional promo text like "Gratis"
  quantity?: number; // Optional quantity to buy
  onAddToCart: (quantity: number) => void;
  normalize: (size: number, factor?: number) => number; // Responsive font size function
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  image,
  name,
  price,
  originalPrice,
  discount,
  inStock,
  promo,
  quantity = 1,
  onAddToCart,
  normalize,
}) => {
  // Format price to IDR
  const formatPrice = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID").replace(/\./g, ".")}`;
  };

  // Get screen width for responsive layout
  const screenWidth = Dimensions.get("window").width;
  const isTablet = screenWidth > 768;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Product Image with Promo Badge */}
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.productImage} />

          {promo && (
            <View style={styles.promoBadge}>
              <Text style={styles.promoText}>{promo}</Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text
            style={[styles.productName, { fontSize: normalize(14, 0.4) }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, { fontSize: normalize(16, 0.4) }]}>
              {formatPrice(price)}
            </Text>
            {discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{discount}%</Text>
              </View>
            )}
            {originalPrice && (
              <Text
                style={[
                  styles.originalPriceText,
                  { fontSize: normalize(12, 0.4) },
                ]}
              >
                {formatPrice(originalPrice)}
              </Text>
            )}
          </View>

          <View style={styles.stockContainer}>
            <Icon name="store" size={14} color="#d00a0b" />
            <Text style={[styles.stockText, { fontSize: normalize(12, 0.4) }]}>
              Stok dari Toko
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Add to Cart Button */}
      <View style={styles.actionContainer}>
        <Text style={[styles.actionText, { fontSize: normalize(14, 0.4) }]}>
          Beli Rutin
          <Text style={{ fontWeight: "bold" }}> {quantity} Pcs</Text>
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddToCart(quantity)}
        >
          <Icon name="plus" size={20} color="#0066B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    padding: 12,
  },
  imageContainer: {
    width: 90,
    height: 90,
    marginRight: 12,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    resizeMode: "contain",
  },
  discountBadge: {
    backgroundColor: "#d00a0b",
    marginRight: 5,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  promoBadge: {
    position: "absolute",
    bottom: -25,
    left: 0,
    right: 0,
    backgroundColor: "#d00a0b",
    padding: 5,
    paddingTop: 10,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    zIndex: -1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  promoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  coinContainer: {
    marginLeft: 5,
  },
  coinIcon: {
    marginTop: 2,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    color: "#333",
    fontWeight: "400",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  priceText: {
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  originalPriceText: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockText: {
    color: "#666",
    fontWeight: "bold",
    marginLeft: 5,
  },
  divider: {
    height: 1,
    marginTop: 20,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 12,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    alignItems: "center",
    padding: 12,
  },
  actionText: {
    color: "#333",
  },
  addButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#0066B2",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoppingList;
