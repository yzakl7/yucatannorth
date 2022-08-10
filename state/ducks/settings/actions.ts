import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import * as firebase from 'firebase/app'
import firebaseConfig from '../../../firebase/firebaseConfig';
import { collection, doc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';

let firebaseApp
const db = getFirestore();

if (firebase.getApps().length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.getApp()
}


const storage = getStorage()

const getSlideRef = (id:string) => {
  const fileRef = ref(storage, `slides/${id}`)
  return fileRef
}

const getSlides = createAsyncThunk(
  'settings/getSlides',
  async (params: void, { rejectWithValue, dispatch }) => {
    try {
      const listRef = ref(storage, `slides`)
      const { items } = await listAll(listRef)
      const slideList = await Promise.all(
        items.map((item) => getDownloadURL(item).then((url) => (
          {
            url,
            name: item.name
          }
        )))
      )
      return ({ slideList })
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const updateFiters = createAsyncThunk(
  'settings/updateFiters',
  async (params: any, { rejectWithValue, dispatch }) => {
    const docRef = doc(db, "settings", "filters")
    try {
      await setDoc(docRef, { ...params })
      await dispatch(getSettings())
      return
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (params: void, { rejectWithValue, dispatch }) => {
    const newDocs:any = []
    const colRef = collection(db, "settings")
    const query_:any = query(colRef)
    try {
      const querySnapshot = await getDocs(query_)
      querySnapshot.forEach((doc:any) => {
        newDocs.push({...doc.data()});
      });
      return ({ settings: { categories: newDocs[0] }})
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const deleteSlide = createAsyncThunk(
  'settings/deleteSlide',
  async (id:string, { rejectWithValue, dispatch }) => {
    const ref = getSlideRef(id)
    try {
      const res = await deleteObject(ref)
      dispatch(getSlides())
      return res  
    } catch(error) {
      return rejectWithValue(error)
    }
  },
)

const uploadSlide = createAsyncThunk(
  'settings/uploadSlide',
  async ({ id, file, preventDelete }:{ id:string, file: any, preventDelete?:boolean }, { rejectWithValue, dispatch }) => {
    const ref = getSlideRef(id)
    try {
      if (!preventDelete) {
        await deleteObject(ref)
      }
      await uploadBytes(getSlideRef(id), file)
      dispatch(getSlides())
      return {}
    } catch(err) {
      rejectWithValue(err)
    }
  },
)

export const uplad = async (id:string, name:string, file:any) => {
  
}

const settingsActions = {
  getSlides,
  deleteSlide,
  uploadSlide,
  getSettings,
  updateFiters
}

export default settingsActions
