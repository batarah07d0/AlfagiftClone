import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Interface for the navigation items
interface NavItem {
  name: string;
  icon: string;
  label: string;
  screen: string;
}

// Interface for the component props
interface BottomNavProps {
  navigation: any;
  activeScreen: string;
  normalize?: (size: number, factor?: number) => number;
}

const BottomNav: React.FC<BottomNavProps> = ({
  navigation,
  activeScreen,
  normalize = defaultNormalize,
}) => {
  // Default navigation items
  const navItems: NavItem[] = [
    { name: "home", icon: "home", label: "Beranda", screen: "Home" },
    {
      name: "shopping",
      icon: "shopping",
      label: "Belanja",
      screen: "Shopping",
    },
    { name: "promo", icon: "percent", label: "Promo", screen: "Promo" },
    {
      name: "orders",
      icon: "clipboard-list",
      label: "Pesanan",
      screen: "OrderList",
    },
    { name: "account", icon: "account", label: "Akun", screen: "Account" },
  ];

  // Handle navigation item press
  const handleNavPress = (screen: string) => {
    if (screen !== activeScreen) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => handleNavPress(item.screen)}
        >
          <Icon
            name={item.icon}
            size={normalize(24, 0.5)}
            color={activeScreen === item.screen ? "#D32F2F" : "#999"}
          />
          <Text
            style={[
              styles.navText,
              { color: activeScreen === item.screen ? "#D32F2F" : "#999" },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Default normalize function if not provided
const defaultNormalize = (size: number, factor: number = 0.5) => {
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

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
  return Math.round(finalSize);
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },
});

export default BottomNav;
