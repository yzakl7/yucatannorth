import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AdminHeader, AdminNav, Footer, Header } from '../components/layout'
import { Container, Modal, Page } from '../components/ui'
import { ProtectRoute } from '../components/ProtectRoute'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../state'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const isLogin = pathname === '/login'
  const showAdminLayout = pathname.toLowerCase().includes('admin')

  const showWebLayout = !isLogin && !showAdminLayout

  return (
    <Provider store={store}>
      <ProtectRoute>
        <Page>
          <AdminHeader />
          {showWebLayout && <Header />}
          <Container gap="0" direction={showAdminLayout ? 'row' : 'column'}>
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
