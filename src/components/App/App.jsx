import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContainer } from "../MainContainer/MainContainer";
import { ContactForm } from "../ContactForm/ContactForm";
import { Filter } from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";


export function App() {
  
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  // const formSubmitHandler = (data) => {
  //   setContacts((prevState) => ([...prevState, {...data}]))
  // };

  const formSubmitHandler = (data) => {
    const found = contacts.find((contact) => contact.name === data.name);
     
    if (!found) {
      setContacts((prevState) => ([...prevState, { ...data }]))
    } else {
      toast.warn(`${data.name} is already in contacts`)
    }
  }
  useEffect(() => {
    return window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

    useEffect(() => {
        return setContacts(JSON.parse(window.localStorage.getItem('contacts')))
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
      <ToastContainer autoClose={3000} />
    </MainContainer>
  )
}