import withLayout from '../components/hoc/withLayout';

const page = () => {
  return <div className="parking">
    <div className="page-title">
      <h1>Parking</h1>
    </div>
    <section className="map">
      <div style={{ height: '60vh', backgroundColor: 'yellow' }}></div>
    </section>
    <section>
      <p>The main car park at Greenwood Park is almost full by 9.00pm</p>
      <p>Please use the overspill car park</p>
      <p className="address">
        <span>Midway Surgery,</span>
        <span>93 Watford Road, AL2 3JX</span>
      </p>
      <p>
        This is less than a 5 minute drive away with a <strong>free </strong>
        mini bus shuttle, every 15 minutes from 9.15pm
      </p>
      <p><strong>PLUS</strong> a chance to win free entry for your next time</p>
      <p>
        <span>IMPORTANT</span>
        <span>
          To keep the roads clear for emergency vehicle access
          and cause minimum disruption to our neighbours on a Friday night
        </span>
      </p>
      <p>
        <span><strong>Don't park where there are traffic cones</strong></span>
        <span><strong>Don't block any driveway.</strong></span>
        <span><strong>Don't park on grass verges.</strong></span>
      </p>
      <p>
        Car park helpers are there every Friday and will advise you where to park
      </p>
      <p>
        <span>They speak on behalf of Salsa Mish</span>
        <span>and will deal with any issues with neighbours</span>
        <span>and visitors to Salsa Mish</span>
      </p>
      <p><strong>THANK YOU!</strong></p>
    </section>
  </div>
}

export default withLayout(page)
