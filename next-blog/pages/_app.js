import '../styles/globals.css'
import Menu from '../components/Menu'
function MyApp({ Component, pageProps }) {
  return (
  <div>
  <Menu />
  k
  <Component {...pageProps} />
  </div>
  )
}

export default MyApp
