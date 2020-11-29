import '../styles/globals.css'
import QueryProvider from '../contexts/queryProvider';

function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider>
      <Component {...pageProps} />
    </QueryProvider>
  )
}

export default MyApp
