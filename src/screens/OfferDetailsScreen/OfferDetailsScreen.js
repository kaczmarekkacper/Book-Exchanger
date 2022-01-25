import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, database } from "../../../firebase";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import WantedElement from "../../components/WantedElement";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";

const OfferDetailsScreen = (props) => {
  const item = props.route.params.item;
  console.log(item);
  const navigation = useNavigation();
  const [usersWanted, setUsersWanted] = useState([]);
  const [actualUsersWanted, setActualUsersWanted] = useState([]);
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    usersWanted.forEach((b) => {
      b.highlight = !!myOffers.includes(b.isbn);
    });
    setActualUsersWanted(usersWanted);
  }, [usersWanted]);
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
          isbn: doc.data().isbn,
          user: doc.data().user,
          author: doc.data().authors,
          timestamp: doc.data().timestamp.toDate(),
          highlight: false,
        }))
      );
      querySnapshot.docs.forEach((d) => console.log(d.data()));
      console.log("Updated user wanted");
      console.log(usersWanted);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(database, "offers");
    const q = query(collectionRef, where("user", "==", auth.currentUser.email));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMyOffers(querySnapshot.docs.map((doc) => doc.data().isbn));
      console.log("Updated my offers");
    });

    return unsubscribe;
  }, []);

  const handledOpenChat = () => {
    console.log("Opening chat with user " + item.user);
    navigation.navigate("ChatScreen", { to_user: item.user });
  };
  return (
    <LayoutWithControlBar>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textdetail}>{`Autor: ${item.author}`}</Text>
          <Text style={styles.textdetail}>{`Tytuł: ${item.title}`}</Text>
          <Text style={styles.textdetail}>{`Użytkownik: ${item.user}`}</Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={item.location}
            style={styles.map}
            showsUserLocation={true}
          >
            <Circle
              center={item.location}
              radius={900}
              strokeWidth={1}
              strokeColor={"#1a66ff"}
              fillColor={"rgba(230,238,255,0.5)"}
            />
          </MapView>
        </View>
        <TouchableOpacity style={styles.button} onPress={handledOpenChat}>
          <Text style={styles.buttonText}>Otwórz czat z wystawcą</Text>
        </TouchableOpacity>

        <Text style={styles.textdetail}>Poszukiwane przez wystawcę:</Text>
        <View style={styles.scrollViewContainter}>
          <FlatList
            data={actualUsersWanted}
            renderItem={(props) => {
              return <WantedElement {...props} />;
            }}
            keyExtractor={(item) => item.timestamp}
          />
        </View>
      </ScrollView>
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
  textdetail: {
    fontSize: 20,
    alignSelf: "stretch",
    backgroundColor: "gray",
    borderRadius: 8,
    marginTop: 3,
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
  map: {
    width: 200,
    height: 200,
  },
});
