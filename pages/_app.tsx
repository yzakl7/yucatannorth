import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../utils/auth/authContext'
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { LangProvider } from '../utils/lang/langContext'
import { Footer, Header } from '../components/layout'
import { Modal, Page } from '../components/ui'
import { ProtectRoute } from '../components/ProtectRoute'

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
    console.log({newDocs});
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
      <AuthProvider>
        <Head>
          <link href="http://fonts.cdnfonts.com/css/roboto" rel="stylesheet"></link>
        </Head>

        <Modal
          isVisible={modalVisibility}
          content={modalContent}
          dismiss={dismissModal}
        />
        <ProtectRoute>
          <Page>
            <Header />
            <Component { ...newProps } />
            <Footer />
          </Page>
        </ProtectRoute>
      </AuthProvider>
    </LangProvider>
  )
}

export default MyApp
