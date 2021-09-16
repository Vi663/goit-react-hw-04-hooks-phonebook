import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContainer } from "../MainContainer/MainContainer";
import { ContactForm } from "../ContactForm/ContactForm";
import { Filter } from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";


export class App extends Component {
  
  state = {
    contacts: [],
    filter: '',
  }
  formSubmitHandler = data => {
    this.setState((prevState) => {
      const found = prevState.contacts.find((contact) => contact.name === data.name);
     
      if (!found) {
        return {
          ...prevState,
          contacts: [...prevState.contacts, data]
        };
      }
      toast.warn(`${data.name} is already in contacts`);
    });
  }

  findByName = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter((contact) => (contact.id !== contactId) ),
    }));
  };

 render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <MainContainer>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler}/>
          <Filter value={filter} onChange={this.findByName}/>
          <ContactList
            contacts={visibleContacts}
          onDeleteContact={this.deleteContact} />
        <ToastContainer autoClose={3000}/>
      </MainContainer>
    );
  }
}