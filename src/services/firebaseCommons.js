import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase_config";
import { successToast, errorToast, infoToast } from "../models/commonToast";

export const dataCollection = async (uid) => {
  const data = [];
  const querySnapshot = await getDocs(collection(db, `portfolio/${uid}/coins`));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const writeCoinDocument = async (
  uid,
  code,
  quantity,
  lastValue = null,
  deltaHour,
  icon
) => {
  try {
    await setDoc(doc(db, `portfolio/${uid}/coins/${code}`), {
      quantity,
      code,
      icon,
      initValue: lastValue,
      deltaHour,
      icon,
      date: new Date().toLocaleString("es-AR", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
    });
    successToast("Datos agregados con exito");
    console.log("Document written");
  } catch (e) {
    errorToast("Ups, Hay un error guardando tus datos");
    console.error("Error adding document: ", e);
  }
};

export const deleteCoinDocument = async (uid, code) => {
  try {
    await deleteDoc(doc(db, `portfolio/${uid}/coins/${code}`));
    infoToast("Datos eliminados con exito");
    console.log("Document deleted");
  } catch (e) {
    errorToast("Ups, Hay un error eliminando el dato");
    console.error("Error deleted document: ", e);
  }
};


// export const dataCollectionOn = async (db, uid) => {
//   const data = [];
//   const collectionData = collection(db, `portfolio/${uid}/coins`)

//   onSnapshot(collectionData, (snap) => {
//     snap.forEach( (doc) => {
//       data.push(doc.data());
//     })
//   });
//   return data;
// };