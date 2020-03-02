import withLayout from '../components/hoc/withLayout';
import Welcome from '../components/home/Welcome';
import ThisFriday from '../components/home/ThisFriday';
import Upcoming from '../components/home/Upcoming';

const page = () => {
    return <div className="home">
        <Welcome />
        <ThisFriday />
        <Upcoming />
        <section>
            <p>Every Friday night dance, meet people, get fit and above all have fun!</p>
            <p>
                <span>Listen to the music,</span>
                <span>feel the passion and</span>
                <span>dance like no-one</span>
                <span>is watching</span>
            </p>
            <p>
                <span>Fantastic atmosphere</span>
                <span>Salsa &amp; Bachata room</span>
                <span>Kizomba room</span>
                <span>Soft drinks bar</span>
                <span>Tea room with</span>
                <span>complimentary tea</span>
                <span>coffee, biscuits and cake</span>
            </p>
            <p>
                <span>Classes from</span>
                <span>7.30pm - 9.45pm</span>
                <span>Freestyle</span>
                <span>9.45pm - 1.00am</span>
            </p>
            <p>
                Greenwood Park, Tippendell Lane, AL2 3HW
            </p>
        </section>
    </div>
}

export default withLayout(page)
