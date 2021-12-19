import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../pages/_app";

type UpdatePropertyDataProps = {
  data: Record<string, string | Record<string,string>>
  id: string
}

export const getPropertyData = async (params:Record<string, string>) => {
  const docRef = doc(db, "properties", `${params.id}`);
  const querySnapshot = await getDoc(docRef);
  const data = querySnapshot.data()
  return data
}

export const updatePropertyData = async (params: UpdatePropertyDataProps) => {
  console.log({params});
  const docRef = doc(db, "properties", params.id);
  const querySnapshot = await setDoc(docRef, {...params.data});
  console.log({querySnapshot});
  // return data
}

export const createNewProperty = async () => {
  const docRef = await addDoc(collection(db, "properties"), {
    name: "Nueva propiedad"
  });
  return docRef.id
}

export const deleteProperty = async (id: string) => {

  try {
    await deleteDoc(doc(db, "properties", id));
    return true
  } catch(error) {
    console.log({error});
    return false
  }
}
