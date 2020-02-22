export default (props) => {
  return <div className='container'>
    <div className='image'>
      <img src='/donald.png' />
    </div>
    <div className='description'>
      <h4>{props.name}</h4>
      <p className='classes'>Classes</p>
      <p className='teacher'>{props.teacher}</p>
      <div className='schedule'>
        <p>7.30 - 8.00</p>
        <p>Beginners</p>
      </div>
      <div className='schedule'>
        <p>9.15 - 9.45</p>
        <p>Intermediates</p>
      </div>
    </div>
    <style jsx>{`
      div {
        display: inline-block;
      }
      .container {
        width: 100%;
        height: 100%;
        display: block;
        display: flex;
        overflow: hidden;
        background: rgb(1,5,27);
        background: linear-gradient(45deg, rgba(1,5,27,1) 30%, rgba(9,9,121,1) 90%, rgba(0,212,255,1) 100%);
      }
      .image {
        height: 100%;
        width: 60%;
        align-self: flex-end;
      }
      .image img {
        object-fit: cover;
        height: inherit;
        width: 100%;
      }
      .description {
        width: 40%;
        align-self: flex-start;
      }
      .description h4 {
        font-size: 32px;
        margin: 10px 0 0 0;
        text-transform: uppercase;
      }
      .description .classes {
        font-size: 30px;
        margin: -10px 0 0 0;
        font-family: 'Parisienne', cursive;
        font-style: italic;
      }
      .description .teacher {
        font-size: 24px;
        margin: 10px 0;
      }
      .description .schedule {
        display: block;
        margin: 0 0 10px 0;
      }
      .description .schedule p {
        margin: 0;
        font-size: 14px;
      }
    `}</style>
  </div>
};