import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import * as firebase from 'firebase/app'
import firebaseConfig from '../../../firebase/firebaseConfig';

let firebaseApp

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
  uploadSlide
}

export default settingsActions
