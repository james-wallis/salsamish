import styles from './IconBar.module.css';

const icons = [
    {
        src: "/icons/Icons-Parking.png",
        alt: "parking icon",
    },
    {
        src: "/icons/Icons-Call.png",
        alt: "call icon",
    },
    {
        src: "/icons/Icons-email.png",
        alt: "email icon",
    },
    {
        src: "/icons/Icons-Insta.png",
        alt: "instagram icon",
    },
    {
        src: "/icons/Icons-Facebook.png",
        alt: "facebook icon",
    },
    {
        src: "/icons/Icons-Twitter.png",
        alt: "twitter icon",
    },
]

export default () => {
    return <div className={styles.container}>
        {icons.map(icon => {
            const { src, alt } = icon;
            return <div className={styles.icon}  key={`icon-${src}`}>
                <img src={src} alt={alt} />
            </div>
        })}
    </div>
}
