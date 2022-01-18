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
        title="Search"
        icon={<Icon name="book" color="white" />}
        onPress={handleSearch}
      />
      <ControlBarIcon
        title="Loved"
        icon={<Icon name="hearto" color="white" />}
        onPress={handleLoved}
      />
      <ControlBarIcon
        title="Wanted"
        icon={<Icon name="pushpin" color="white" />}
        onPress={handleWanted}
      />
      <ControlBarIcon
        title="Add"
        icon={<Icon name="pluscircleo" color="white" />}
        onPress={handleAddOffer}
      />
      <ControlBarIcon
        title="Chats"
        icon={<Icon name="message1" color="white" />}
        onPress={handleChats}
      />
      <ControlBarIcon
        title="Account"
        icon={<Icon name="team" color="white" />}
      />
      <ControlBarIcon
        title="Logout"
        icon={<Icon name="logout" color="white" />}
        onPress={handleLogOut}
      />
    </View>
  );
};

export default ControlBar;
