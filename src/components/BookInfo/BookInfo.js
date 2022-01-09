import React from "react";
import { StyleSheet, Text } from "react-native";

const BookInfo = (props) => {
  return !!props && !!props.volumeInfo ? (
    <>
      <Text style={styles.title}>Informacje o ksiazce</Text>
      <Text style={styles.title}>{props.volumeInfo.title}</Text>
      <Text style={styles.title}>{props.volumeInfo.authors}</Text>
      <Text style={styles.title}>{props.volumeInfo.publishedDate}</Text>
      <Text style={styles.title}>{props.volumeInfo.pageCount}</Text>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  title: { fontSize: 15 },
  text: { fontSize: 10 },
});

export default BookInfo;
