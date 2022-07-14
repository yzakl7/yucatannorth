import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { query, addDoc, collection, deleteDoc, where, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import * as firebase from 'firebase/app'
import firebaseConfig from '../../../firebase/firebaseConfig';

let firebaseApp

if (firebase.getApps().length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.getApp()
}

const db = getFirestore();

type SparePartListParams = {
  search?: string,
  filters?: Record<string, string>[]
}

const getSparePartList = createAsyncThunk(
  'spareParts/getSparePartList',
  async (params: Record<string, string | Record<string, string>> | void, { rejectWithValue, dispatch }) => {
    const filters = (params as any).filters || []
    try {
      const newDocs:any = []
      const queryFilters = Object.keys(filters).map(
        (filter:any) => {
          console.log(filter, "==", filters[filter])
          return where(filter, "==", filters[filter])
        },
      );
      
      const query_:any = query(
        collection(db, "spareParts"),
        ...queryFilters
        )
      const querySnapshot = await getDocs(query_)
      querySnapshot.forEach((doc) => {
        newDocs.push(doc.data());
      });
      return ({ sparePartList: newDocs })
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
