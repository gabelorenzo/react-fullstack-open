import React from 'react'

const Persons = ({ phoneBookEntries }) => {
  return (
    <>
      {
        phoneBookEntries.map(person =>
          <div key={person.id}>
            <span>{ person.name } </span>
            <span>{ person.phone }</span>
          </div>
        )
      }
    </>
  )
}

export default Persons