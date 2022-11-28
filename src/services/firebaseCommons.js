import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";

export const dataCollection = async (db, uid) => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, `portfolio/${uid}/coins`));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const dataCollectionOn = async (db, uid) => {
  const data = [];
  const collectionData = collection(db, `portfolio/${uid}/coins`)

  onSnapshot(collectionData, (snap) => {
    snap.forEach( (doc) => {
      data.push(doc.data());
    })
  });
  return data;
};

export const writeCoinDocument = async(db, uid, code, quantity, lastValue=null, deltaHour, icon) => {
  try {
    await setDoc(doc(db, `portfolio/${uid}/coins/${code}`), {
      quantity,
      code,
      icon,
      initValue: lastValue,
      deltaHour,
      icon,
      date: (new Date).toLocaleString("es-AR", {  hour: "numeric", minute: "numeric", second: "numeric", year: "2-digit", month: "2-digit", day: "2-digit"}),
    });
    console.log("Document written for ID: " + uid);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
};