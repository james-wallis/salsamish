import Head from 'next/head';
import Navbar from '../../components/navbar';

export default () => {
  return <div>
    <Head>
      <title>DJs</title>
      <link href="https://fonts.googleapis.com/css?family=Parisienne|Roboto:300,500&display=swap" rel="stylesheet" />
    </Head>
    <Navbar />
    <div style={{ height: '200vh' }}>
      lkjsdf
    </div>
    <style global jsx>{`
      body { 
        margin: 0;
        font-family: 'Roboto Condensed', sans-serif;
        overflow-x: hidden;
        color: white;
        background-color: black;
      }
      h1, h2, h3, h4, h5, h6, p, a {
        font-weight: 300;
      }
    `}</style>
    <style jsx>{`
      div { 
        width: 100%;
        text-align: center;
      }  
    `}</style>
  </div>
}