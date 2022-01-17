import { Button } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {
  doc,
  setDoc,
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { auth } from "../../../firebase";

const FavouriteIcon = (props) => {
  const db = getFirestore();

  const [id, setId] = useState(!!props.favId ? props.favId : uuid.v1());

  const addFav = () => {
    const offerData = {
      offerId: props.id,
      user: auth.currentUser?.email,
    };
    console.log(offerData);
    setDoc(doc(db, "fav", id), offerData);
  };

  const removeFav = (fav_id) => {
    deleteDoc(doc(db, "fav", fav_id));
  };

  return (
    <View style={style.container}>
      <Button
        buttonStyle={style.button}
        icon={<Icon name={props.inDB ? "heart" : "hearto"} color="white" />}
        iconPosition="top"
        title={""}
        onPress={() => {
          props.setRefresh(!props.refresh);
          console.log(id);
          console.log(props.favId);
          console.log(props.inDB);
          if (!!props.inDB) {
            removeFav(props.favId);
          } else {
            addFav();
          }
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
  },
  button: {
    backgroundColor: "#3b3b3b",
  },
});

export default FavouriteIcon;
