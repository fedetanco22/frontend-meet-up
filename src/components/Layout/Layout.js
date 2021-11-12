import React from 'react'
import Head from 'next/head'
import Navbar from '../Navbar/Navbar'


const Layout = ({children , pageTitle}) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar/>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
