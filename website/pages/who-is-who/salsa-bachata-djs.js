import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';
import DjTeacherImage from '../../components/who-is-who/DjTeacherImage';

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
    <PageTitle title="Salsa &amp; Bachata DJ's" />
    <section>
      < DjTeacherImage array={DJS} />
    </section>
  </div>
}

export default withLayout(page)
