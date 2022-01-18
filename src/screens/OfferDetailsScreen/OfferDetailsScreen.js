import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { database } from "../../../firebase";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";

const OfferDetailsScreen = (props) => {
  const item = props.route.params.item;
  const navigation = useNavigation();
  const [usersWanted, setUsersWanted] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "wanted");
    const q = query(
      collectionRef,
      orderBy("timestamp", "desc"),
      where("user", "==", item.user)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsersWanted(
        querySnapshot.docs.map((doc) => ({
          title: doc.data().title,
          id: doc.id,
          user: doc.data().user,
          author: doc.data().authors,
          timestamp: doc.data().timestamp.toDate(),
        }))
      );
      console.log("Updated");
    });

    return unsubscribe;
  }, []);

  const handledOpenChat = () => {
    console.log("Opening chat with user " + item.user);
    navigation.navigate("ChatScreen", { to_user: item.user });
  };
  return (
    <LayoutWithControlBar>
      <View style={styles.container}>
        <Text>{`Autor: ${item.author}`}</Text>
        <Text>{`Tytuł: ${item.title}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handledOpenChat}>
          <Text style={styles.buttonText}>Otwórz czat</Text>
        </TouchableOpacity>
      </View>
      <Text>Poszukiwane przez wystawcę:</Text>
      <View style={styles.scrollViewContainter}>
        <FlatList
          data={usersWanted}
          renderItem={(props) => {
            return <OfferElement {...props} />;
          }}
          keyExtractor={(item) => item.timestamp}
        />
      </View>
    </LayoutWithControlBar>
  );
};

export default OfferDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonOutlineText: {
    color: "green",
    fontWeight: "700",
    fontSize: 15,
  },
  scrollViewContainter: {
    flexDirection: "column",
    height: "70%",
    width: "100%",
  },
});
