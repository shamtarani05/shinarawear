import React from 'react';
import styles from '../styles/categoryfilter.module.css';

const CategoryFilter = ({ categories, selected, onChange }) => (
  <div className={styles.filterWrapper}>
    <label className={styles.label}>Category:</label>
    <select
      className={styles.select}
      value={selected}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  </div>
);

export default CategoryFilter; 