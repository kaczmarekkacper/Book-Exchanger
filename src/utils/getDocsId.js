import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const getDocId = async (email) => {
  const db = getFirestore();
  const q = query(collection(db, "fav"), where("user", "==", email));

  let data = null;
  const objectsArray = [];
  try {
    data = await getDocs(q);
  } catch (error) {
    console.error(error);
  }
  data.forEach((doc) => {
    objectsArray.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return objectsArray;
};

export default getDocId;
