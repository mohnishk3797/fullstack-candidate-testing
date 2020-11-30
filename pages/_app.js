import '../styles/globals.css'
import "../styles/tailwind.css"
const Layout = ({ children }) => <div className="layout">{children}</div>

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
