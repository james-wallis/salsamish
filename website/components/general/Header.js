import React, { useEffect } from 'react';
import styles from './Header.module.css';

export default () => {
    useEffect(() => {
        window.addEventListener('resize', handleNavigationHeightChange);
        return () => {
            window.removeEventListener('resize', handleNavigationHeightChange);
        }
    });

    return <header id='header' className={styles.header}>
        <img src="/icons/SalsaMishLogo.png" alt="salsa mish logo" />
        <h2>the heart of salsa in herts</h2>
        <img className={styles.menuIcon} src="/icons/Icon-Menubutton.png" alt="open menu icon" onClick={showNavigation} />
    </header>
}

const showNavigation = () => {
    const navigationContainer = document.getElementById('navigation');
    if (navigationContainer.style.height !== '') {
        navigationContainer.style.height = '';
    } else {
        const height = getContentHeight();
        navigationContainer.style.height = height;
    }
}

const handleNavigationHeightChange = () => {
    const navigationContainer = document.getElementById('navigation');
    if (navigationContainer.style.height !== '') {
        const height = getContentHeight();
        navigationContainer.style.height = height;
    }
}

const getContentHeight = () => {
    const fullHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const headerHeight = document.getElementsByTagName('HEADER')[0].offsetHeight;
    const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight;
    const contentHeight = fullHeight - (headerHeight + footerHeight);
    return `${contentHeight}px`;
}
