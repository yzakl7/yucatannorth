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
    const newDocs: any[] = []
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      querySnapshot.forEach((doc) => newDocs.push({...doc.data(), id: doc.id})); 
      setProperties(newDocs);
      return true
    } catch (err) {
      return false
    }
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
  newProps.getStnapshot = getStnapshot
  newProps.callModal = callModal
  newProps.dismissModal = dismissModal

  useEffect(() => {
    getStnapshot()
  }, [])

  return (
    <LangProvider>
      <AuthProvider>
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
