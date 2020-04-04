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
        href: 'tel:+447832359209',
    },
    {
        src: "/icons/Icons-email.png",
        alt: "email icon",
        href: 'mailto:mish@salsamish.co.uk?Subject=Hello%20from%20salsamish.co.uk',
    },
    {
        src: "/icons/Icons-Insta.png",
        alt: "instagram icon",
        href: 'https://www.instagram.com/salsamish',
    },
    {
        src: "/icons/Icons-Facebook.png",
        alt: "facebook icon",
        href: 'https://www.facebook.com/SalsaMish',
    },
    {
        src: "/icons/Icons-Twitter.png",
        alt: "twitter icon",
        href: 'https://twitter.com/salsamish',
    },
]

export default () => {
    return <footer className={styles.container}>
        {icons.map(icon => {
            const { src, alt, href } = icon;
            return <div className={styles.icon}  key={`icon-${src}`}>
                {addLinkedImage({ src, alt, href })}
            </div>
        })}
    </footer>
}

const addLinkedImage = ({ href, src, alt }) => {
    if (href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) {
        return <a href={href} target="_blank" rel="noreferrer noopener">
            <img src={src} alt={alt} />
        </a>
    }
    return <Link href={href}>
        <img src={src} alt={alt} />
    </Link>
}
