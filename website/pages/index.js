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
        <span>Welcome to Salsa Mish, the heart of Salsa in Herts</span>
        <span>Every Friday - the salsa social of the week</span>
        <span>7.30pm - 1.00am</span>
        <span>Dance, meet people, get fit and above all have fun!</span>
      </p>
      <p>Listen to the music, feel the passion and dance like no-one is watching</p>
      <p>
        <span>Fantastic atmosphere</span>
        <span>Salsa &amp; Bachata room</span>
        <span>Kizomba room</span>
        <span>Soft drinks bar, tea room with complimentary tea, coffee, biscuits and cake</span>
      </p>
      <p>
        <span>Classes from 7.30pm - 9.45pm</span>
        <span>Freestyle 9.45pm - 1.00am</span>
        <span>Greenwood Park, Tippendell Lane, AL2 3HW</span>
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