import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageStyle,
  PixelRatio,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const WelcomePage = ({ navigation }) => {
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

  // Responsive measurements
  const logoWidth = width * 0.22;
  const logoHeight = logoWidth * 0.4;
  const characterSize = Math.min(width * 0.7, 280); // Cap at 280
  const isLargeDevice = width > 768; // Tablet detection

  // Dynamic styles
  const dynamicStyles = {
    redBackground: {
      height: height * 0.32,
    } as ViewStyle,
    yellowStripe: {
      top: isLargeDevice ? height * 0.31 : height * 0.3,
    } as ViewStyle,
    characterContainer: {
      top: isLargeDevice ? height * 0.18 : height * 0.1,
    } as ViewStyle,
    characterImage: {
      width: characterSize,
      height: characterSize,
      // borderRadius: characterSize / 2,
    } as ImageStyle,
    contentContainer: {
      paddingTop: isLargeDevice ? height * 0.4 : height * 0.5,
    } as ViewStyle,
    title: {
      fontSize: normalize(24, 0.7), // More aggressive scaling for titles
      marginTop: isTablet ? 10 : 0,
    } as TextStyle,
    subtitle: {
      fontSize: normalize(17, 0.6),
      lineHeight: normalize(22, 0.6),
      maxWidth: isTablet ? "100%" : "100%",
    } as TextStyle,
    buttonText: {
      fontSize: normalize(15, 0.6),
    } as TextStyle,
    paginationDot: {
      width: width * 0.025,
      height: width * 0.025,
      borderRadius: width * 0.0125,
      marginHorizontal: width * 0.01,
    } as ViewStyle,
    buttonContainer: {
      width: isLargeDevice ? "80%" : "100%",
      alignSelf: isLargeDevice ? ("center" as const) : ("stretch" as const),
    } as ViewStyle,
    logo: {
      width: logoWidth,
      height: logoHeight,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 5,
      borderColor: "white",
      borderWidth: 1,
    } as ImageStyle,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#CF0B0F" barStyle="light-content" />

      {/* Red background with logo */}
      <View style={[styles.redBackground, dynamicStyles.redBackground]}>
        <Image
          source={require("../assets/alfamart-logo.png")}
          style={dynamicStyles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Character Image */}
      <View
        style={[styles.characterContainer, dynamicStyles.characterContainer]}
      >
        <Image
          source={require("../assets/welcome-character.png")}
          style={dynamicStyles.characterImage}
          resizeMode="contain"
        />
      </View>

      {/* Yellow stripe */}
      <View style={[styles.yellowStripe, dynamicStyles.yellowStripe]} />

      {/* Content area */}
      <View style={[styles.contentContainer, dynamicStyles.contentContainer]}>
        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, dynamicStyles.title]}>
            Selamat Datang di Alfagift!
          </Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
            Alfamart menghadirkan aplikasi Alfagift untuk memudahkan para
            Sahabat dalam memenuhi kebutuhan sehari-hari serta memberikan
            promo-promo menarik dengan mendaftar menjadi member.
          </Text>
        </View>

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          <View
            style={[
              styles.paginationDot,
              styles.activeDot,
              dynamicStyles.paginationDot,
            ]}
          />
          <View style={[styles.paginationDot, dynamicStyles.paginationDot]} />
          <View style={[styles.paginationDot, dynamicStyles.paginationDot]} />
        </View>

        {/* Buttons */}
        <View style={[styles.buttonContainer, dynamicStyles.buttonContainer]}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.loginButtonText, dynamicStyles.buttonText]}>
              MASUK
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.registerButtonText, dynamicStyles.buttonText]}>
              DAFTAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  redBackground: {
    backgroundColor: "#ba2e23",
    position: "absolute",
    width: "101%",
    top: 0,
    paddingTop: 20,
    paddingLeft: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFFFFF",
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  yellowStripe: {
    position: "absolute",
    backgroundColor: "#FFD102",
    width: "100%",
    top: 0,
    paddingTop: 25,
    paddingLeft: 20,
    borderBottomRightRadius: 10,
    zIndex: 0,
    // Position and height are set dynamically
  },
  logo: {
    // Width and height are set dynamically
  },
  characterContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 2,
    // Top position is set dynamically
  },
  characterImage: {
    // Size is set dynamically
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // Padding top is set dynamically
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
    textAlign: "center",
    // Font size is set dynamically
  },
  subtitle: {
    color: "#555555",
    textAlign: "center",
    // Font size and line height are set dynamically
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  paginationDot: {
    backgroundColor: "#E0E0E0",
    // Size is set dynamically
  },
  activeDot: {
    backgroundColor: "#FFD102", // Yellow active dot
  },
  buttonContainer: {
    // paddingHorizontal: 10,
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    // Width is set dynamically
  },
  loginButton: {
    borderColor: "#2b5d9e",
    width: "49%",
    borderWidth: 1,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 3,
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#2b5d9e",
    fontWeight: "bold",
    // Font size is set dynamically
  },
  registerButton: {
    backgroundColor: "#2b5d9e",
    width: "49%",
    borderTopRightRadius: 3,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 3,
    padding: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    // Font size is set dynamically
  },
});

export default WelcomePage;
