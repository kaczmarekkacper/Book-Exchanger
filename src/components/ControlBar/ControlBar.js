import React from "react";
import { View } from "react-native";
import ControlBarIcon from "../ControlBarIcon";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ControlBar = (props) => {
  const navigation = useNavigation();
  const handleAddOffer = () => {
    navigation.navigate("AddOfferScreen");
  };
  const handleSearch = () => {
    navigation.navigate("OffersScreen");
  };
  return (
    <View style={props.containerStyle}>
      <ControlBarIcon
        title="Search"
        icon={<Icon name="home" color="white" />}
        onPress={handleSearch}
      />
      <ControlBarIcon
        title="Loved"
        icon={<Icon name="hearto" color="white" />}
        onPress={handleSearch}
      />
      <ControlBarIcon
        title="Add"
        icon={<Icon name="pluscircleo" color="white" />}
        onPress={handleAddOffer}
      />
      <ControlBarIcon
        title="Chats"
        icon={<Icon name="message1" color="white" />}
      />
      <ControlBarIcon
        title="Account"
        icon={<Icon name="team" color="white" />}
      />
    </View>
  );
};

export default ControlBar;
