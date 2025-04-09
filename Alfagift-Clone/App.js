import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screens
import AccountPage from "./Screens/AccountPage";
import AccountSettings from "./Screens/AccountSettings";
import DetailAccount from "./Screens/DetailAccount";
import HomePage from "./Screens/HomePage";
import LoginPage from "./Screens/LoginPage";
import OrderList from "./Screens/OrderList";
import RegisterPage from "./Screens/RegisterPage";
import ResetPassword from "./Screens/ResetPassword";
import ShoppingPage from "./Screens/ShoppingPage";
import WelcomePage from "./Screens/WelcomePage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Shopping" component={ShoppingPage} />
        <Stack.Screen name="Account" component={AccountPage} />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="LogOut" component={WelcomePage} />
        <Stack.Screen name="DetailAccount" component={DetailAccount} />
        <Stack.Screen name="OrderList" component={OrderList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
