import React from 'react';
import s from './ContactList.module.css'


export function ContactList({ contacts, onDeleteContact }) {
  return (
    contacts.length === 0 ?
      <p className={s.ContactList}>There are no contacts yet</p>
      : <ul className={s.ContactList}>
      {contacts.map(({ id, name, number }) => (
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