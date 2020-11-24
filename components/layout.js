import Head from 'next/head'
import Link from 'next/link'



export default function Layout({ children, home }) {
  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Nextjs"
        />
      </Head>
      
      <main>{children}</main>
      
    </div>
  )
}
