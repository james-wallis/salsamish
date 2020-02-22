import Head from 'next/head';
import Hero from '../components/home/hero';
import Navbar from '../components/navbar';

export default () => {
  return <div>
    <Head>
      <title>Salsa Mish</title>
      <link href="https://fonts.googleapis.com/css?family=Parisienne|Roboto:300,500&display=swap" rel="stylesheet" />
    </Head>
    <Hero />
    <Navbar />
    <div id='content' style={{height: '200vh'}}>
      <p>
        sdlfksjdlfksdjf
      </p>
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
      p {
        text-align: left;
      }
      p span {
        display: block;
      }
    `}</style>
  </div>
}