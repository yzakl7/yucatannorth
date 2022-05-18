import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { Footer, Header } from '../components/layout'
import { Modal, Page } from '../components/ui'
import { ProtectRoute } from '../components/ProtectRoute'
import firebaseConfig from '../firebase/firebaseConfig'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { hooks, store } from '../state'
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter()
  const isLogin = pathname === '/login'
  const { useAppDispatch } = hooks


  return (
    <>
      <Provider store={store}>
        <ProtectRoute>
          <Page>
            {!isLogin && <Header />}
            <Component { ...pageProps } />
            {!isLogin && <Footer />}
          </Page>
        </ProtectRoute>
      </Provider>
    </>
  )
}

export default MyApp
