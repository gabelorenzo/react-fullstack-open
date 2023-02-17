import { useState, useEffect } from 'react'
import Filter from './Filter';
import Notification from './Notification';
import PersonForm from './PersonForm';
import Persons from './Persons';
import phonebook from './services/phonebook';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState('success')

  useEffect(() => {
    phonebook.getAll().then(res => {
      setPersons(res)
      setFilteredPersons(res)
    })
  }, []);

  const addToPhonebook = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newPhone};

        phonebook.update(existingPerson.id, updatedPerson).then(person => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p));
        }).catch((error) => {
          if (error.response.status === 404) {
            setNotification(
              `Information of '${existingPerson.name}' doesn't exist or has already been removed from the server`
            )
            setNotificationStatus('error')
          }
        });
      } else {
        // Do nothing!
      }

    } else {
      const newPerson = { id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) , name: newName, number: newPhone };

      phonebook.create(newPerson).then(createdPerson => {
        setNotification(
          `Added '${createdPerson.name}'`
        )
        setNotificationStatus('success')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.concat(createdPerson));
      })
    }
  }

  useEffect(() => {
    const filteredPersons = searchText ? persons.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())) : persons
    setFilteredPersons(filteredPersons)
  }, [persons, searchText])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notificationClassName={notificationStatus} />
      <Filter onFilter={(event) => setSearchText(event.target.value)}/>
      <h3>Add</h3>
      <PersonForm
        onNameChange={(event) => setNewName(event.target.value)}
        onPhoneChange={(event) => setNewPhone(event.target.value)}
        onSubmit={addToPhonebook}
      />
      <h3>Numbers</h3>
      {
        filteredPersons.length > 0 && <Persons persons={filteredPersons} />
      }
    </div>
  )
}

export default App
