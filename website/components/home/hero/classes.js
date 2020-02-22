import Class from './class';

export default () => {
  return <div className='container'>
    <Class name='salsa' teacher='Mish' />
    <Class name='salsa' teacher='Mish' />
    <Class name='salsa' teacher='Mish' />
    <style jsx>{`
      .container {
        display: flex;
        height: calc(34% - 1em);
        margin-top: 1em;
        flex-direction: row;
        align-items: top;
        justify-content: space-around;
      }
    `}</style>
  </div>
}