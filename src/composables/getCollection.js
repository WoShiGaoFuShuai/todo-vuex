import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getCollection = (collectionName) => {
  const documents = ref(null);

  //collection ref
  let colRef = collection(db, collectionName);

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
