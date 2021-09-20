import React from 'react';
import s from './ContactList.module.css'
import { v4 as uuidv4 } from 'uuid';

export function ContactList({ contacts, onDeleteContact }) {
  const id = uuidv4();
  return (
    contacts.length === 0 ?
      <p className={s.ContactItem}>There are no contacts yet</p>
      : <ul className={s.ContactList}>
      {contacts.map(({ name, number }) => (
        <li key={id} className={s.ContactItem}>
          <span className={s.ContactName}>{name} </span>
          <span className={s.ContactListNumber}>{number}</span>
          <button
            type="button"
            className={s.ContactBtn}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}