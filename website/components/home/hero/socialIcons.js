export default () => {
  return <div>
    <i className='icon' />
    <i className='icon' />
    <i className='icon' />
    <i className='icon' />
    <i className='icon' />
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
      }
      .icon {
        height: 2em;
        width: 2em;
        border: 1px solid white;
        margin: 0 5px;
        background-color: black;
      }
    `}</style>
  </div>
}