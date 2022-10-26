import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const Persons = ({ persons }) => {
  const [phonebookPersons, setPhonebookPersons] = useState(persons)

  useEffect(() => {
    setPhonebookPersons(persons)
  }, [persons])

  const deleteFromPhonebook = (id) => {
    phonebook
      .remove(id)
      .then(res => setPhonebookPersons(phonebookPersons.filter(p => p.id !== id)))
  }
  return (
    <>
      {
        phonebookPersons.map(person =>
          // NOTE: using a unique id would be a better key than name, but this project it's fine.
          <div key={person.name}>
            <span>{ person.name } </span>
            <span>{ person.number }</span>
            <button onClick={() => deleteFromPhonebook(person.id)}>delete</button>
          </div>
        )
      }
    </>
  )
}

export default Persons