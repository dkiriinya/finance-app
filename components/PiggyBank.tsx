import React from 'react';
import styles from './Piggy.module.css'; 

export const PiggyBank: React.FC = () => {
  return (
        <div className={styles.piggyWrapper}>
          <div className={styles.piggyWrap}>
            <div className={styles.piggy}>
              <div className={styles.piggyLogo}></div>
              <div className={styles.nose}></div>
              <div className={styles.mouth}></div>
              <div className={styles.ear}></div>
              <div className={styles.tail}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.eye}></div>
              <div className={styles.hole}></div>
            </div>
          </div>
          <div className={styles.coinWrap}>
            <div className={styles.coin}>$</div>
          </div>
          <div className={styles.legs}></div>
          <div className={`${styles.legs} ${styles.back}`}></div>
        </div>
  );
};

