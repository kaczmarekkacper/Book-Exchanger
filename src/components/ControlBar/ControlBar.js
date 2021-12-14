import React from "react";
import { View } from "react-native";
import ControlBarIcon from "../ControlBarIcon";
import Icon from "react-native-vector-icons/AntDesign";

const ControlBar = (props) => {
  return (
    <View style={props.containerStyle}>
      <ControlBarIcon
        title="Search"
        icon={<Icon name="home" color="white" />}
      />
      <ControlBarIcon
        title="Loved"
        icon={<Icon name="hearto" color="white" />}
      />
      <ControlBarIcon
        title="Add"
        icon={<Icon name="pluscircleo" color="white" />}
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
