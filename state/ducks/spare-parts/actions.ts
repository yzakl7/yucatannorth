import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import * as firebase from 'firebase/app'
import firebaseConfig from '../../../firebase/firebaseConfig';

let firebaseApp

if (firebase.getApps().length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.getApp()
}

const db = getFirestore();

const getSparePartList = createAsyncThunk(
  'spareParts/getSparePartList',
  async (params: void, { rejectWithValue, dispatch }) => {
    try {
      const newDocs:any = []
      const querySnapshot = await getDocs(collection(db, "spareParts"));
      querySnapshot.forEach((doc:any) => newDocs.push({...doc.data(), id: doc.id})); 
      return { sparePartList: newDocs }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const getSparePartItem = createAsyncThunk(
  'spareParts/getSparePartItem',
  async ({id}: any, { rejectWithValue, dispatch }) => {
    try {
      const docRef = doc(db, "spareParts", `${id}`);
      const querySnapshot = await getDoc(docRef);
      const data = querySnapshot.data()
      return { sparePartItem: data }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const createSparePartItem = createAsyncThunk(
  'spareParts/createSparePartItem',
  async ({ params, callback }: {params: any, callback?: () => void }, { rejectWithValue, dispatch }) => {
    try {
      await addDoc(collection(db, "spareParts"), { ...params })
      dispatch(getSparePartList())
      if (callback) {
        callback()
      }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const updateSparePartItem = createAsyncThunk(
  'spareParts/updateSparePartItem',
  async ({ params, callback }: {params: any, callback?: () => void }, { rejectWithValue, dispatch }) => {
    try {
      await setDoc(doc(db, "spareParts", params.id), { ...params })
      dispatch(getSparePartList())
      if (callback) {
        callback()
      }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)



const deleteSparePartItem = createAsyncThunk(
  'spareParts/deleteSparePartItem',
  async ({ id, callback }: any, { rejectWithValue, dispatch }) => {
    try {
      await deleteDoc(doc(db, "spareParts", id));
      dispatch(getSparePartList())
      if (callback) { callback() }
    } catch (err) {
      if (!(err as Record<string, string>).response) {
        throw err
      }
      return rejectWithValue(err)
    }
  },
)

const userManagerActions = {
  getSparePartList,
  getSparePartItem,
  createSparePartItem,
  updateSparePartItem,
  deleteSparePartItem
}

export default userManagerActions
