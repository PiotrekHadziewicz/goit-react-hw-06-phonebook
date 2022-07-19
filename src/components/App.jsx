import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { saveLocalStorage, loadLocalStorage } from './localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, filterContact, addFromLocalStorage } from '../store/actions';

export const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const inputRef = useRef();
  const nameId = useRef(nanoid());
  const numberId = useRef(nanoid());
  const filterId = useRef(nanoid());

  const dispatch = useDispatch();
  const setContacts = (payload) => dispatch(addContact(payload));
  const contacts = useSelector(state => state.contacts);
  const setDelete = (payload) => dispatch(deleteContact(payload));
  const setFilter = (payload) => dispatch(filterContact(payload));
  const filter = useSelector(state => state.contacts.filter);
  const setContactsFromLS = (payload) => dispatch(addFromLocalStorage(payload));

  useEffect(() => {
    const localStorageArray = loadLocalStorage('contacts');
    if (localStorageArray?.length) {
      setContactsFromLS(localStorageArray);
    }
    inputRef.current.focus();
    // eslint-disable-next-line 
  },[]);

  useEffect(() => {
    if (name === '') {
      saveLocalStorage('contacts', contacts.items);
    }
    // eslint-disable-next-line 
  }, [contacts]);

  const handleSubmit = ev => {
    ev.preventDefault();
    if (contacts.items.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newContacts = { id: nanoid(), name: name, number: number };
      setContacts(newContacts);
      setName('');
      setNumber('');
      }
  };
  
  const handleSetName = ev => {
    setName(ev.target.value);
  };

  const handleSetNumber = ev => {
    setNumber(ev.target.value);
  };

  const handleSetFilter = ev => {
    setFilter(ev.target.value);
  };

  const deleteHandler = id => {
    setDelete(id);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <ContactForm
          inputRef={inputRef}
          formId={nameId.current}
          type="text"
          inputName="Name"
          value={name}
          setName={handleSetName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <ContactForm
          formId={numberId.current}
          type="tel"
          inputName="Number"
          value={number}
          setName={handleSetNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit">Add contact</button>
      </form>
      <h1>Contacts</h1>
      <Filter
        setName={handleSetFilter}
        inputId={filterId.current}
        type="text"
        inputName="Filter"
        value={filter}
      />
      <ContactList contacts={contacts} filter={filter} deleteHandler={deleteHandler}/>
    </>
  );
}

// export default App;
