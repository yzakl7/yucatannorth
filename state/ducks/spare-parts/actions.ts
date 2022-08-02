import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { query, addDoc, collection, deleteDoc, where, doc, getDoc, getDocs, getFirestore, setDoc, limit } from 'firebase/firestore';
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
  async (params: any, { rejectWithValue, dispatch }) => {
    const filters = (params as any)?.filters || []
    const { query: queryParam } = params
    try {
      const newDocs:any = []
      const colRef = collection(db, "spareParts")
      const queryFilters = Object.keys(filters).map(
        (filter:any) => {
          return where(filter, "==", filters[filter])
        },
      );

      if (queryFilters.length) {
        const query_:any = query(
          colRef,
          ...queryFilters,
          limit(500)
        )
        const querySnapshot = await getDocs(query_)
        querySnapshot.forEach((doc:any) => {
          newDocs.push({...doc.data(), id: doc.id});
        });
        return ({ sparePartList: newDocs })
      } 

      if (queryParam) {
        const query_:any = query(
          colRef,
          where("indexedKeywords", 'array-contains', queryParam),
          limit(500)
        )
        const querySnapshot = await getDocs(query_)
        querySnapshot.forEach((doc:any) => {
          newDocs.push({...doc.data(), id: doc.id});
        });
        return ({ sparePartList: newDocs })
      } 

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

const clearSelectedSparePart = createAction(
  'spareParts/clearSelectedSparePart',
  () => ({payload: ''})
)

const clearSparePartList = createAction(
  'spareParts/clearSparePartList',
  () => ({payload: ''})
)

const updateSparePartItem = createAsyncThunk(
  'spareParts/updateSparePartItem',
  async ({ params, callback }: {params: any, callback?: () => void }, { rejectWithValue, dispatch }) => {
    try {
      await setDoc(doc(db, "spareParts", params.id), { ...params })
      console.log('success')
      // dispatch(getSparePartList())
      if (callback) {
        callback()
      }
    } catch (err) {
      console.log('no success',err)
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
      // dispatch(getSparePartList())
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
  deleteSparePartItem,
  clearSelectedSparePart,
  clearSparePartList
}

export default userManagerActions
