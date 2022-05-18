import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AdminHeader, Footer, Header } from '../components/layout'
import { Container, Modal, Page } from '../components/ui'
import { ProtectRoute } from '../components/ProtectRoute'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '../state'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const isLogin = pathname === '/login'
  const showAdminLayout = pathname === '/admin'
  const showWebLayout = !isLogin && !showAdminLayout

  return (
    <Provider store={store}>
      <ProtectRoute>
        <Page>
          <AdminHeader />
          {showWebLayout && <Header />}
          <Container direction='row'>
            {showAdminLayout && <> + </>}
            <Component { ...pageProps } />
          </Container>
          {showWebLayout && <Footer />}
        </Page>
      </ProtectRoute>
    </Provider>
  )
}

export default MyApp
