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
} from "firebase/firestore";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";

import { auth, database } from "../../../firebase";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const to_user = props.route.params.to_user;
  let users = [];
  users.push(to_user);
  users.push(auth.currentUser.email);
  users.sort(function (a, b) {
    return a > b;
  });
  const channel_id = users[0] + "_" + users[1];

  useEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(
      collectionRef,
      where("channel_id", "==", channel_id),
      orderBy("createdAt", "desc"),
      limit(20)
    );

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
    addDoc(collection(database, "chats"), {
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
