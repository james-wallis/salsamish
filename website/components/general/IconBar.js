import styles from './IconBar.module.css';
import Link from 'next/link';

const icons = [
    {
        src: "/icons/Icons-Parking.png",
        alt: "parking icon",
        href: "/parking",
    },
    {
        src: "/icons/Icons-Call.png",
        alt: "call icon",
        href: '',
    },
    {
        src: "/icons/Icons-email.png",
        alt: "email icon",
        href: '',
    },
    {
        src: "/icons/Icons-Insta.png",
        alt: "instagram icon",
        href: '',
    },
    {
        src: "/icons/Icons-Facebook.png",
        alt: "facebook icon",
        href: '',
    },
    {
        src: "/icons/Icons-Twitter.png",
        alt: "twitter icon",
        href: '',
    },
]

export default () => {
    return <footer className={styles.container}>
        {icons.map(icon => {
            const { src, alt, href } = icon;
            return <div className={styles.icon}  key={`icon-${src}`}>
                <Link href={href}>
                    <img src={src} alt={alt} />
                </Link>

            </div>
        })}
    </footer>
}
