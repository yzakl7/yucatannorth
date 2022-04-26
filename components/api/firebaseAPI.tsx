import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../pages/_app";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

type UpdatePropertyDataProps = {
  data: Record<string, string | Record<string,string>[] | Record<string,string>>
  id: string
}

const storage = getStorage()

export const getFileRef = (id:string, name:string) => {
  const fileRef = ref(storage, `${id}/${name}`)
  return fileRef
}

export const deletePDF = async (id:string, name:string) => {
  const ref = getFileRef(id, name)
  try {
    const res = await deleteObject(ref)
    const property = await getPropertyData({id})
    const updatedPorpertyData: any = { ...property, pdf: false }
    updatePropertyData({id, data: updatedPorpertyData})
    return res
  } catch(error) {
    throw(error)
  }
}

export const deleteImage = async (id:string, name:string) => {
  const ref = getFileRef(id, name)
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

export const deleteLandingCoverImage = async (id:string, name:string) => {
  const ref = getFileRef(id, name)
  try {
    const res = await deleteObject(ref)
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

export const getLandingCoverImage = async () => {
  try {
    const listRef = ref(storage, `landing-page`)

    const { items } = await listAll(listRef)

    if (items.length > 0 ) {
      const image = await getDownloadURL(items[0])
      return image
    }
    return ''

  } catch(err) {
    throw(err)
  }
}

export const uploadImage = async (id:string, name:string, file:any) => {
  try {
    const response = await uploadBytes(getFileRef(id, name), file )
    const imgUrl = await getDownloadURL(response.ref)
    const property = await getPropertyData({id})
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

export const uploadLandingCoverImage = async (id:string, name:string, file:any) => {
  try {
    const response = await uploadBytes(getFileRef(id, name), file )
    const imgUrl = await getDownloadURL(response.ref)
    return imgUrl
  } catch(err) {
    throw(err)
  }
}

export const uploadPDF = async (id:string, name:string, file:any) => {
  try {
    const response = await uploadBytes(getFileRef(id, name), file )
    const fileURL = await getDownloadURL(response.ref)
    const property = await getPropertyData({id})
    const pdf = { name, fileURL }
    const updatedPorpertyData:any = { ...property, pdf }
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
  return data
}

export const updatePropertyData = async (params: UpdatePropertyDataProps) => {
  const docRef = doc(db, "properties", params.id);
  try {
    const ret = await setDoc(docRef, {...params.data});
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
