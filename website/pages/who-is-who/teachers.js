import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';

const DJS = [
  'julian',
  'erick',
  'otto',
  'tuli',
  'mani',
  'rosi'
]

const page = () => {
  return <div className="who-is-who-djs-teachers">
    <PageTitle title="Teachers DJ's" />
    <section>
      {DJS.map(dj => {
        return <div>{dj}</div>
      })}
    </section>
  </div>
}

export default withLayout(page)