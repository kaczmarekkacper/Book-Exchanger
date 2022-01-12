import React from "react";
import { StyleSheet } from "react-native";
import OffersScreen from "./src/screens/OffersScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import AddOfferScreen from "./src/screens/AddOfferScreen";
import OfferDetailsScreen from "./src/screens/OfferDetailsScreen";
import ChatScreen from "./src/screens/ChatScreen/ChatScreen";
import UserChatsScreen from "./src/screens/UserChatsScreen";

///
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
///

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="OffersScreen"
          component={OffersScreen}
          options={{ title: "Ogłoszenia" }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="ScannerScreen"
          component={ScannerScreen}
          options={{ title: "Zeskanuj kod kreskowy" }}
        />
        <Stack.Screen
          name="AddOfferScreen"
          component={AddOfferScreen}
          options={{
            title: "Dodaj ogłoszenie",
          }}
        />
        <Stack.Screen
          name="OfferDetailsScreen"
          component={OfferDetailsScreen}
          options={{
            title: "Szczegóły ogłoszenia",
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: "Chat Prywatny",
          }}
        />
        <Stack.Screen
          name="UserChatsScreen"
          component={UserChatsScreen}
          options={{
            title: "Moje Chaty",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
