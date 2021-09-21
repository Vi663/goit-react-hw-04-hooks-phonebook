import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';

export function ContactForm ({onSubmit}) {
  
  const initialContact = {
    name: "",
    number: "",
  };
  
  const [contact, setContact] = useState (initialContact);
  const { name, number } = contact;

  const handleChange = event => {
    const { name, value } = event.target;
    setContact((prevState) => ({
      ...prevState, [name]: value
    }))
  };

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();


  const handleSubmit = e => {
    e.preventDefault()
    // window.localStorage.setItem('contact', JSON.stringify(contact))
    onSubmit(contact)
    resetContact()
  }

  const resetContact = () => {
    setContact({ ...initialContact });
  }

  return (
    <form className={s.ContactForm} autoComplete="on" onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        className={s.ContactInput}
        type="text"
        name="name"
        value={name}
        id={nameInputId}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
        
      <label htmlFor={numberInputId}>Phone number</label>
      <input
        className={s.ContactInput}
        type="tel"
        name="number"
        value={number}
        id={numberInputId}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
      />
      <button className={s.ContactBtn}
        type="submit"
        name="submit">Add Contact
      </button>
    </form>
  )
}