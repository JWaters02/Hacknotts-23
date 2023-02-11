import React, { FC } from 'react';
import styles from './ShopPane.module.css';

interface ShopPaneProps {}

const ShopPane: FC<ShopPaneProps> = () => (
  <div className={styles.ShopPane}>
    ShopPane Component
  </div>
);

export default ShopPane;
