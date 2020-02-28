import styles from './NavLinks.module.css';

const links = [
  {
    name: 'Home',
  },
  {
    name: 'FAQ\'s',
  },
  {
    name: 'Parking',
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
      const { name } = obj;
      return <li className={styles.link}>{name}</li>
    })}
  </ul>
}