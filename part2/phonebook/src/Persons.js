import React from 'react'

const Persons = ({ phoneBookEntries }) => {
  return (
    <>
      {
        phoneBookEntries.map(person =>
          // NOTE: using a unique id would be a better key than name, but this project it's fine.
          <div key={person.name}>
            <span>{ person.name } </span>
            <span>{ person.number }</span>
          </div>
        )
      }
    </>
  )
}

export default Persons