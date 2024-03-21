import React from 'react';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>AppGreat - Notes Assigment</h1>
      <h2 className={styles.subTitle}>Made by: Aleksandar Milosheski</h2>
    </header>
  );
}

export default Header;
