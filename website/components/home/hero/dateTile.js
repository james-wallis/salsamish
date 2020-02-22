import moment from 'moment';

export default () => {
  const { day, month } = getNextFridayDate();
  return <div>
    <h2>
      <span>This Friday</span>
      <span className='number'>{day}</span>
      <span>{month}</span>
    </h2>
    <style jsx>{`
      div {
        position: absolute;
        top: 55%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        z-index: 10;
      }
      h2 {
        background-color: white;
        padding: 10px;
        color: black;
        box-shadow: 0px 0px 14px 2px rgba(0,0,0,0.75);
        text-transform: uppercase;
      }
      span { 
        display: block;
        font-size: 22px;
      }
      span:first-child { 
        font-size: 16px;
      }
      .number {
        font-size: 50px;
        color: red;
        font-weight: 500;
        line-height: 46px;
      }
    `}</style>
  </div>
}

const getNextFridayDate = () => {
  const friday = 5; // Friday
  const today = moment().isoWeekday();
  let date = moment().isoWeekday(friday);
  if (today > friday) {
    date = moment().add(1, 'weeks').isoWeekday(friday);
  }
  return {
    day: date.format('D'),
    month: date.format('MMM')
  }
}