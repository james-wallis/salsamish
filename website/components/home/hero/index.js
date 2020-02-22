import Header from './header';
import DateTile from './dateTile';
import DJS from './djs';
import Classes from './classes';

export default () => {
  return <div id='hero'>
    <Header />
    <DateTile />
    <DJS />
    <Classes />
    <style jsx>{`
      div { 
        width: 100%;
        height: 90vh;
        position: relative;
        background-color: black;
        color: white;
      }  
    `}</style>
  </div>
}