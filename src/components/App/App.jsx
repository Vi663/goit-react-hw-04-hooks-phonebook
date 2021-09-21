import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { MainContainer } from "../MainContainer/MainContainer";
import { ContactForm } from "../ContactForm/ContactForm";
import { Filter } from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";


export function App() {
  
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts'))
  })
  const [filter, setFilter] = useState('')


  const formSubmitHandler = (data) => {
    const found = contacts.find((contact) => contact.name === data.name || contact.number === data.number);
     
    if (!found) {
      setContacts((prevState) => ([...prevState, { id: uuidv4(), ...data }]))
    } else {
      toast.error(`This name or number is already in contacts`)
    }
  }
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  useEffect(() => {
    setContacts(JSON.parse(window.localStorage.getItem('contacts')))
  }, [])

  const findByName = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => (prevState.filter(contact => (contact.id !== contactId))))
  };

  return (
    <MainContainer>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={formSubmitHandler}
      />
      <Filter
        value={filter}
        onChange={findByName}
      />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
      <ToastContainer theme="colored" autoClose={3000} />
    </MainContainer>
  )
}