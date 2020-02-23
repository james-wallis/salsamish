import styles from './Header.module.css';

export default () => {
    return <div className={styles.header}>
        <img src="/icons/SalsaMishLogo.png" alt="salsa mish logo" />
        <h2 className="salsa-green-text">the heart of salsa in herts</h2>
        <img className={styles.menuIcon} src="/icons/Icon-Menubutton.png" alt="open menu icon" />
    </div>
}
