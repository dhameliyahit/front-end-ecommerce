import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <>
      <Helmet>
        <div>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={author} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </div>


          <title>{title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Header />
      
      <main style={{ minHeight: "70vh" }}>
      <Toaster />
        {children}
        </main>
      <Footer />
    </>
  )
}

Layout.defultProps = {
  title:'E-Commerce -shopnow ',
  description:'wellcome to HD ecommerce Store',
  keyword:'MongoDb express js nodejs reactjs',
  author:'Dhameliyahit'
}
export default Layout
