import React from "react";
import { View } from "react-native";
import ControlBarIcon from "../ControlBarIcon";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

const ControlBar = (props) => {
  const navigation = useNavigation();
  const handleAddOffer = () => {
    navigation.navigate("AddOfferScreen");
  };
  const handleSearch = () => {
    navigation.navigate("OffersScreen");
  };
  const handleChats = () => {
    navigation.navigate("UserChatsScreen");
  };
  const handleLoved = () => {
    navigation.navigate("FavouriteScreen");
  };
  const handleWanted = () => {
    navigation.navigate("WantedScreen");
  };
  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={props.containerStyle}>
      <ControlBarIcon
        title="Szukaj"
        icon={<Icon name="book" color="white" />}
        onPress={handleSearch}
      />
      <ControlBarIcon
        title="Ulubione"
        icon={<Icon name="hearto" color="white" />}
        onPress={handleLoved}
      />
      <ControlBarIcon
        title="Poszukiwane"
        icon={<Icon name="pushpin" color="white" />}
        onPress={handleWanted}
      />
      <ControlBarIcon
        title="Dodaj"
        icon={<Icon name="pluscircleo" color="white" />}
        onPress={handleAddOffer}
      />
      <ControlBarIcon
        title="Wiadomości"
        icon={<Icon name="message1" color="white" />}
        onPress={handleChats}
      />
      <ControlBarIcon title="Konto" icon={<Icon name="team" color="white" />} />
      <ControlBarIcon
        title="Wyloguj"
        icon={<Icon name="logout" color="white" />}
        onPress={handleLogOut}
      />
    </View>
  );
};

export default ControlBar;
