import React, { useEffect } from 'react';
import styles from './Header.module.css';

export default () => {
    return <header id='header' className={styles.header}>
        <img src="/icons/SalsaMishLogo.png" alt="salsa mish logo" />
        <h2>the heart of salsa in herts</h2>
        <img className={styles.menuIcon} src="/icons/Icon-Menubutton.png" alt="open menu icon" onClick={showNavigation} />
    </header>
}

const showNavigation = () => {
    console.log('clicked');
    const navigationContainer = document.getElementById('navigation');
    if (navigationContainer.style.height === '100%') {
        navigationContainer.style.height = '';
    } else {
        navigationContainer.style.height = '100%';
    }
}
