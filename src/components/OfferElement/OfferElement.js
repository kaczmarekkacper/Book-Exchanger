import React from "react";

import { Image, StyleSheet, View, Text } from "react-native";

const OfferElement = (props) => {
  return (
    <View style={style.container}>
      <Image
        style={style.image}
        source={{
          uri: props.imageUrl,
          width: 200,
          height: 300,
        }}
      ></Image>
      <Text style={style.title}>{props.title}</Text>
      <Text style={style.wanted}>{`For: ${props.wanted}`}</Text>
      <Text style={style.timestamp}>{props.timestamp}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "20%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
  },
  wanted: {
    fontSize: 15,
    alignItems: "flex-start",
  },
});

export default OfferElement;
