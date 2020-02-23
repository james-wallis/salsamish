import styles from './ThisFriday.module.css';

export default () => {
    return <div className={styles.container}>
        <div className={styles.carousel}>
            <div className={styles.social}>
                <img src="/icons/Icons-Facebook.png" alt="facebook icon" />
            </div>
            <div className={styles.date}>
                <p><span>20</span> Mar</p>
            </div>
        </div>
        <div className={styles.carouselFooter}>
            <h1>This friday at salsa mish</h1>
            <div>
                <div className={styles.radioButton}></div>
                <div className={styles.radioButton}></div>
                <div className={styles.radioButton}></div>
                <div className={styles.radioButton}></div>
                <div className={styles.radioButton}></div>
                <div className={styles.radioButton}></div>
            </div>
        </div>
    </div>
}
