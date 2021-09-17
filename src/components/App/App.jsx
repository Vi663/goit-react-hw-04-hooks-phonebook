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

  // const formSubmitHandler = data => {
  //   useEffect(prevState => {
  //     const found = prevState.contacts.find((contact) => contact.name === data.name)
  //     if (!found) {
  //       setContacts(data, ...prevState)
  //       return {
  //         ...prevState, contacts
  //       }
  //     } toast.warn(`${data.name} is already in contacts`);
  //   }, [prevState])
  // }

  const formSubmitHandler = data => {
    setContacts(state => state, data)
  }
  const findByName = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter((contact) => (contact.id !== contactId) ))
  };

    return (
      <MainContainer>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={formSubmitHandler}/>
          <Filter value={filter} onChange={findByName}/>
          <ContactList
            contacts={getVisibleContacts}
          onDeleteContact={deleteContact} />
        <ToastContainer autoClose={3000}/>
      </MainContainer>
    )
}