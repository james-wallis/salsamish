{/* <SalsaBachataTile /> */ }
{/* <KizombaTile /> */ }

export default () => {
  return <div className='container'>
    <div id="salsa-bachata" className='row'>
      <img src='/donald.png' />
      <h3>Salsa &amp; Bachata DJ Tuli</h3>
    </div>
    <div id="kizomba" className='row'>
      <img src='/donald.png' />
      <h3>Kizomba DJ Yannick</h3>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        height: 66%;
        flex-direction: row;
      }
      .row {
        width: 70%;
        margin-top: -60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      h3 {
        text-transform: uppercase;
        width: 100%;
        margin: 0;
        padding: 0.5em;
        box-shadow: 0px 0px 16px 3px rgba(0,0,0,0.75);
      } 
      img {
        height: calc(90% - 80px);
      }
      #salsa-bachata {
        order: 0;
        transform: rotate(-7deg);
        background-color: rgba(41, 20, 129, 0.5);
        text-align: right;
        margin-right: 30px;
        margin-left: -60px;
        align-items: flex-end;
      }
      #salsa-bachata h3 {
        background-color: blue;
        padding-right: 5em;
      }
      #kizomba {
        order: 1;
        transform: rotate(7deg);
        background-color: rgba(88, 6, 9, 0.5);
        text-align: left;
        margin-left: 30px;
        margin-right: -60px;
        align-items: flex-start;
      }
      #kizomba h3 {
        background-color: red;
        padding-left: 5em;
      }
    `}</style>
  </div>
}