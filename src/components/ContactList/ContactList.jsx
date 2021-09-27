import React from 'react';
import s from './ContactList.module.css'


export function ContactList({ contacts, onDeleteContact }) {
  return (
    <div>
      {!contacts.length &&
        <p className={s.contactList}>There are no contacts yet</p>}
      {contacts.length &&
        <ul className={s.contactList}>
          {contacts.map(({ id, name, number }) => (
            <li key={id} className={s.contactItem}>
              <span className={s.contactItemName}>{name} </span>
              <span className={s.contactItemNumber}>{number}</span>
              <button
                type="button"
                className={s.contactBtn}
                onClick={() => onDeleteContact(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}