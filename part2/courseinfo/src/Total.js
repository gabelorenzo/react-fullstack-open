import React from 'react'

export const Total = ({ parts }) => {
  return (
    <div>
        <p><b>total of { parts.reduce((acc, part) => acc + part.exercises, 0) } exercises</b></p>
    </div>
  )
}

export default Total;