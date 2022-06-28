import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AdminHeader, AdminNav, Footer, Header } from '../components/layout'
import { Container, Modal, Page } from '../components/ui'
import { ProtectRoute } from '../components/ProtectRoute'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../state'
import { useEffect } from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const isLogin = pathname === '/login'
  const showAdminLayout = pathname.toLowerCase().includes('admin')

  const showWebLayout = !isLogin && !showAdminLayout


  useEffect(() => {
    if (
      pathname === '/about-us' 
      || pathname === '/contact-us'
    ) {
      setTimeout(() => {
        window.scrollTo({
          top: 860,
          behavior: 'smooth',
        });
      }, 650);
    }
  }, [pathname])
  
  return (
    <Provider store={store}>
      <ProtectRoute>
        <Page>
          <AdminHeader />
          {showWebLayout && <Header />}
          <Container height='100%' gap="0" direction={showAdminLayout ? 'row' : 'column'}>
            {showAdminLayout && <AdminNav />}
            <Component { ...pageProps } />
          </Container>
          {showWebLayout && <Footer />}
        </Page>
      </ProtectRoute>
    </Provider>
  )
}

export default MyApp
