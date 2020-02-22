import SocialIcons from './socialIcons';

export default () => {
  return <div>
    {/* <h1>Salsa Mish</h1> */}
    <img src='/salsamish.png' />
    <SocialIcons />
    <style jsx>{`
      div {
        position: absolute;
        top: 0;
        z-index: 10;
        left: 0;
        right: 0;
      }
      h1 { 
        margin: 0 auto;
      }
    `}</style>
  </div>
}