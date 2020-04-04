import styles from './NavContainer.module.css';

export default props => {
  return <nav id="navigation" className={styles.container}>{props.children}</nav>
}