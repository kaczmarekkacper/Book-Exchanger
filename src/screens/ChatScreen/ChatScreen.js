import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  limit,
  where,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";

import { auth, database } from "../../../firebase";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const from_user = auth.currentUser.email;
  const to_user = props.route.params.to_user;
  let users = [];
  users.push(to_user);
  users.push(auth.currentUser.email);
  users.sort(function (a, b) {
    return a > b;
  });
  const channel_id = users[0] + "_" + users[1];

  const idPair = [from_user, to_user].sort().join("_");
  console.log(idPair);
  const roomColRef = collection(database, "rooms", idPair, "messages");
  const chatsColRef = collection(database, "user_chats", from_user, "chats");
  const d1 = doc(database, "user_chats", from_user);
  const d2 = doc(database, "user_chats", to_user);
  const da = new Date();
  setDoc(d1, { [to_user]: da.getTime() }, { merge: true }).then(
    console.log("Channel created")
  );
  setDoc(d2, { [from_user]: da.getTime() }, { merge: true }).then(
    console.log("Channel created")
  );

  useEffect(() => {
    //const collectionRef = collection(database, "chats");
    const q = query(roomColRef, orderBy("createdAt", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
      console.log("Updated");
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    //addDoc(collection(database, "chats"), {
    addDoc(roomColRef, {
      _id,
      createdAt,
      text,
      user,
      channel_id: channel_id,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
  );
};
export default ChatScreen;
