import { useState, useEffect, useMemo } from 'react';

import { nanoid } from 'nanoid';

import { ContactList } from 'components/ContactList/ContactList';
import PhoneForm from 'components/PhoneForm/PhoneForm';
import { Filter } from 'components/Filter/filter';

import css from 'components/App.module.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Aline Copand', number: '227-96-26' },
    { id: 'id-6', name: 'Appolina Copander', number: '227-96-25' },
    { id: 'id-7', name: 'Nigera Coopera', number: '225-96-25' },
    { id: 'id-8', name: 'Regina Cobra', number: '25-96-25' },
    { id: 'id-9', name: 'Edena Kliente-Cobra', number: '125-96-25' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsStorage);

    if (parsedContacts) {
      setContacts(parsedContacts);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name: name, number: number };
    const names = contacts.map(contact => contact.name.toLowerCase());
    if (names.includes(name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const getVisiblefilter = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    filter({ filter: e.target.value });
  };

  return (
    <div className={css.phonebook_contacts_block}>
      <PhoneForm onSubmit={addContact} />
      <h2 className={css.phonebook_title_h2}> Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisiblefilter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
export { App };
