import axios from 'axios';
import { useState, useEffect } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      });
  }, []);

  const addToPhonebook = (event) => {
    event.preventDefault();

    const nameAlreadyAdded = persons.find(p => p.name === newName);

    if (nameAlreadyAdded) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) , name: newName, number: newPhone }));
    }
  }

  const phoneBookEntries = searchText ? persons.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={(event) => setSearchText(event.target.value)}/>
      <h3>Add</h3>
      <PersonForm
        onNameChange={(event) => setNewName(event.target.value)}
        onPhoneChange={(event) => setNewPhone(event.target.value)}
        onSubmit={addToPhonebook}
      />
      <h3>Numbers</h3>
      <Persons phoneBookEntries={phoneBookEntries} />
    </div>
  )
}

export default App
