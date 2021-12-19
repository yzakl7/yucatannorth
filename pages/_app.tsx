import '../styles/globals.css'
// import * as firebase from 'firebase/app'
import type { AppProps } from 'next/app'
// import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
// import { AuthProvider } from '../utils/auth/authContext'
// import { ProtectRoute } from '../components/ProtectRoute'
// import { Header } from '../components/header/header'
// import { ReactNode, useEffect, useState } from 'react'
// import { Page } from '../components/UI/style/page'
// import Head from 'next/head'
// import { LangProvider } from '../utils/lang/langContext'
// import Modal from '../components/UI/notifications/modal'
// import firebaseConfig from '../firebase/firebaseConfig'

// export const db = getFirestore();

// let firebaseApp
// if (firebase.getApps().length === 0) {
//   firebaseApp = firebase.initializeApp(firebaseConfig)
// } else {
//   firebaseApp = firebase.getApp()
// }

function MyApp({ Component, pageProps }: AppProps) {
  // const newProps = { ...pageProps }
  // const [modalContent, setModalContent] = useState<ReactNode>(<></>)
  // const [modalDismissCallback, setModalDismissCaback] = useState(() => null)
  // const [modalVisibility, setModalVisibility] = useState(false)

  // const [properties, setProperties] = useState<any>([])

  // const getStnapshot = async () => {
  //   const querySnapshot = await getDocs(collection(db, "properties"));
  //   const newDocs: any[] = []
  //   querySnapshot.forEach((doc) => newDocs.push({...doc.data(), id: doc.id})); 
  //   setProperties(newDocs);
  // }

  // const addProperty = async (formValues: any) => {
  //   await setDoc(doc(db, "properties"), {
  //     formValues
  //   });
  // }

  // const deleteProperty = () => {

  // }

  // const callModal = (content: ReactNode) => {
  //   setModalContent(content)
  //   if (!modalVisibility) {
  //     setModalVisibility(true)
  //   }
  // }

  // const dismissModal = () => {
  //   setModalVisibility(false)
  //   // if (modalDismissCallback) {
  //   //   return modalDismissCallback()
  //   // }
  //   return null
  // }

  // newProps.properties = properties
  // newProps.addProperty = addProperty
  // newProps.callModal = callModal
  // newProps.dismissModal = dismissModal

  // useEffect(() => {
  //   getStnapshot()
  // }, [])

  return (
    <>
      {/* <LangProvider> */}
        {/* <AuthProvider> */}
          {/* <Head>
            <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet"></link>
          </Head> */}

          {/* <Header />
          <Modal
            isVisible={modalVisibility}
            content={modalContent}
            dismiss={dismissModal}
          /> */}
          {/* <ProtectRoute> */}
          hola
            {/* <Page>
              <Component { ...newProps } />
            </Page> */}
          {/* </ProtectRoute> */}
        {/* </AuthProvider> */}
      {/* </LangProvider> */}
    </>
  )
}

export default MyApp
