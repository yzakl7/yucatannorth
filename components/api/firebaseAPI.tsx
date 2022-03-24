import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../pages/_app";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

type UpdatePropertyDataProps = {
  data: Record<string, string | Record<string,string>[] | Record<string,string>>
  id: string
}

const storage = getStorage()

export const getImageRef = (id:string, name:string) => {
  const imageRef = ref(storage, `${id}/${name}`)
  return imageRef
}

export const deleteImage = async (id:string, name:string) => {
  const ref = getImageRef(id, name)
  try {
    const res = await deleteObject(ref)
    const property = await getPropertyData({id})
    const images = property?.images.filter(({name: imageName}: any) => imageName !== name )
    const updatedPorpertyData: Record<string, string | Record<string, string>[]> = { ...property, images }
    updatePropertyData({id, data: updatedPorpertyData})
    return res
  } catch(error) {
    throw(error)
  }
}

export const getImageList = async (id:string) => {
  try {
    const listRef = ref(storage, `${id}`)
    const imageList = await listAll(listRef)
    return imageList
  } catch(err) {
    throw(err)
  }
}

export const uploadImage = async (id:string, name:string, file:any) => {
  try {
    const response = await uploadBytes(getImageRef(id, name), file )
    const imgUrl = await getDownloadURL(response.ref)

    const property = await getPropertyData({id})
    console.log({property});
    const images = property?.images ? [ ...property?.images] : []
    images.push({
      name, imgUrl
    })
    const updatedPorpertyData: Record<string, string | Record<string, string>[]> = { ...property, images }
    updatePropertyData({id, data: updatedPorpertyData})
    return response
  } catch(err) {
    throw(err)
  }
}

export const getPropertyData = async (params:Record<string, string | Record<string, string>[]>) => {
  const docRef = doc(db, "properties", `${params.id}`);
  const querySnapshot = await getDoc(docRef);
  const data = querySnapshot.data()
  console.log({property: data});
  return data
}

export const updatePropertyData = async (params: UpdatePropertyDataProps) => {
  const docRef = doc(db, "properties", params.id);
  try {
    await setDoc(docRef, {...params.data});
    return true
  } catch(err) {
    throw err
  }
}

export const createNewProperty = async (params: Record<string, string>) => {
  const docRef = await addDoc(collection(db, "properties"), {
    name: "Nueva propiedad",
    location: params.location || 'norte-poniente',
    property_type: params.property_type || 'house'
  });
  return docRef.id
}

export const deleteProperty = async (id: string) => {

  try {
    await deleteDoc(doc(db, "properties", id));
    return true
  } catch(error) {
    return false
  }
}
