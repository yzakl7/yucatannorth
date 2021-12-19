import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth/authContext'
import { ProtectRoute } from '../components/ProtectRoute'
import { Header } from '../components/header/header'
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { ReactNode, useEffect, useState } from 'react'
import { Page } from '../components/UI/style/page'
import Head from 'next/head'
import { LangProvider } from '../utils/lang/langContext'
import Modal from '../components/UI/notifications/modal'

export const db = getFirestore();

function MyApp({ Component, pageProps }: AppProps) {
  const newProps = { ...pageProps }
  const [modalContent, setModalContent] = useState<ReactNode>(<></>)
  const [modalDismissCallback, setModalDismissCaback] = useState(() => null)
  const [modalVisibility, setModalVisibility] = useState(false)

  const [properties, setProperties] = useState<any>([])

  const getStnapshot = async () => {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const newDocs: any[] = []
    querySnapshot.forEach((doc) => newDocs.push({...doc.data(), id: doc.id})); 
    setProperties(newDocs);
  }

  const addProperty = async (formValues: any) => {
    await setDoc(doc(db, "properties"), {
      formValues
    });
  }

  const deleteProperty = () => {

  }

  const callModal = (content: ReactNode) => {
    setModalContent(content)
    if (!modalVisibility) {
      setModalVisibility(true)
    }
  }

  const dismissModal = () => {
    setModalVisibility(false)
    // if (modalDismissCallback) {
    //   return modalDismissCallback()
    // }
    return null
  }

  newProps.properties = properties
  newProps.addProperty = addProperty
  newProps.callModal = callModal
  newProps.dismissModal = dismissModal

  useEffect(() => {
    getStnapshot()
  }, [])

  return (
    <LangProvider>
      {/* <AuthProvider> */}
        <Head>
          <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet"></link>
        </Head>

        <Header />
        <Modal
          isVisible={modalVisibility}
          content={modalContent}
          dismiss={dismissModal}
        />
        {/* <ProtectRoute> */}
          <Page>
            <Component { ...newProps } />
          </Page>
        {/* </ProtectRoute> */}
      {/* </AuthProvider> */}
    </LangProvider>
  )
}

export default MyApp
