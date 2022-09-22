import { useState } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    // Normally not safe to use Math.random to generate ID b/c there is the potential for a collision. Normally better to generate a UUID or something
    { name: 'Arto Hellas', phone: '040-123456', id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)  },
    { name: 'Dan Abramov', phone: '12-43-234345', id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)  },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)  }
  ])
  const [searchText, setSearchText] = useState('');
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addToPhonebook = (event) => {
    event.preventDefault();

    const nameAlreadyAdded = persons.find(p => p.name === newName);

    if (nameAlreadyAdded) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) , name: newName, phone: newPhone }));
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