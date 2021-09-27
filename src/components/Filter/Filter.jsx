import React from 'react';
import s from './Filter.module.css'

export const Filter = ({ value, onChange }) => (
  <label className={s.filterLabel}>
    Find contacts by name
    <input className={s.filterInput} type="text" value={value} onChange={onChange} />
  </label>
);

