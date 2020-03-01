import styles from './NavLinks.module.css';
import Link from 'next/link'

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'FAQ\'s',
    href: '/faq',
  },
  {
    name: 'Parking',
    href: '/parking',
  },
  {
    name: 'The Venue',
  },
  {
    name: '2020 Dates',
  },
  {
    name: 'Who is Who',
  },
  {
    name: 'The Dances',
  },
  {
    name: 'Salsa For Kids',
  },
  {
    name: 'About SalsaMish',
  },
  {
    name: 'Corporate Parties',
  },
  {
    name: 'Weddings & Occasions',
  },
]

export default () => {
  return <ul className={styles.container}>
    {links.map(obj => {
      const { name, href } = obj;
      // TODO remove the next line
      const url = (href) ? href : '/';
      return <li className={styles.link} key={`link-to-${name}`}>
        <Link href={url}>
          <a>{name}</a>
        </Link>
      </li>
    })}
  </ul>
}