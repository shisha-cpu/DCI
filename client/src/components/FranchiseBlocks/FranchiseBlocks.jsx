import React from 'react';
import styles from './FranchiseBlocks.module.css';

const FranchiseBlocks = () => {
  return (
    <div className={styles.container}>
      {/* Блок 1 */}
      <div className={styles.block}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 12L8 24v16l24 12 24-12V24L32 12z" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M32 12v40" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M8 24l24 12 24-12" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <circle cx="32" cy="24" r="2" fill="#A5D6A7"/>
            <circle cx="20" cy="30" r="2" fill="#A5D6A7"/>
            <circle cx="44" cy="30" r="2" fill="#A5D6A7"/>
          </svg>
        </div>
        <h3 className={styles.title}>Разместить франшизу</h3>
        <p className={styles.description}>Предложите свою франшизу на нашей платформе и найдите партнеров</p>
        <button className={styles.button}>
          Подробнее
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Блок 2 */}
      <div className={styles.block}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="40" height="40" rx="2" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M20 20h24v24H20z" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M32 20v24" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M20 32h24" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <circle cx="26" cy="26" r="2" fill="#A5D6A7"/>
            <circle cx="38" cy="26" r="2" fill="#A5D6A7"/>
            <circle cx="26" cy="38" r="2" fill="#A5D6A7"/>
            <circle cx="38" cy="38" r="2" fill="#A5D6A7"/>
          </svg>
        </div>
        <h3 className={styles.title}>Создать франшизу</h3>
        <p className={styles.description}>Поможем разработать франшизу вашего бизнеса с нуля</p>
        <button className={styles.button}>
          Подробнее
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Блок 3 */}
      <div className={styles.block}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 20L32 32 20 20" fill="none" stroke="#A5D6A7" strokeWidth="2" strokeLinecap="round"/>
            <path d="M44 44L32 32 20 44" fill="none" stroke="#A5D6A7" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="32" cy="12" r="4" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <circle cx="12" cy="32" r="4" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <circle cx="32" cy="52" r="4" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <circle cx="52" cy="32" r="4" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
            <path d="M32 16v8M16 32h8M32 48v-8M48 32h-8" fill="none" stroke="#A5D6A7" strokeWidth="2"/>
          </svg>
        </div>
        <h3 className={styles.title}>Сопровождение сделки</h3>
        <p className={styles.description}>Полное юридическое и организационное сопровождение</p>
        <button className={styles.button}>
          Подробнее
          <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FranchiseBlocks;