import React, { useEffect } from 'react';
import styles from './Header.module.css';

export default () => {
    useEffect(() => {
        fixHeader();
        window.addEventListener('scroll', fixHeader);
        return () => {
          window.removeEventListener('scroll', fixHeader);
        };
    });

    return <div id='header' className={styles.header}>
        <img src="/icons/SalsaMishLogo.png" alt="salsa mish logo" />
        <h2>the heart of salsa in herts</h2>
        <img className={styles.menuIcon} src="/icons/Icon-Menubutton.png" alt="open menu icon" onClick={() => console.log('clicked')} />
    </div>
}

const fixHeader = () => {
    const header = document.getElementById('header');
    const height = header.offsetHeight;
    document.body.style.marginTop = `${height}px`;
    header.style.position = 'fixed';
}
