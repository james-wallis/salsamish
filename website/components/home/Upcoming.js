import styles from './Upcoming.module.css';

const dates = [
    '27 Mar',
    '3 Apr',
    '10 Apr',
    '17 Apr',
    '24 Apr'
];

export default () => {
    return <div className={styles.container}>
        <p>2020 Fridays</p>
        {dates.map(date => {
            return <p key={`date-${date}`}>{date}</p>
        })}
    </div>
}
