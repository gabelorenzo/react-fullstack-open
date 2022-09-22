import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  // Index of selected anecdote
  const [selected, setSelected] = useState(0)

  // Array where each item is the number of votes corresponding to the anecdotes array
  // at the corresponding index
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // The index of the anecdote with the highest number of votes
  const [highestVoted, setHighestedVoted] = useState(0)

  const updateAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  useEffect(() => {
    let max = 0;
    let maxIndex = 0;

    votes.forEach((vote, index) => {
      if (vote > max) {
        max = vote;
        maxIndex = index;
      }
    })
    

    setHighestedVoted(maxIndex);
  }, [votes]);

  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected]++;
    setVotes(updatedVotes);

    const sortedByHighest = [...updatedVotes];
    sortedByHighest.sort((a, b) => a > b);
    setHighestedVoted(sortedByHighest[0]);
  };

  return (
    <div>
      <h4>{anecdotes[selected]}</h4>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => voteAnecdote(selected)}>vote</button>
      <button onClick={updateAnecdote}>next anecdote</button>

      <h4>Anecdote with most votes</h4>
      <p>{anecdotes[highestVoted]}</p>
      <p>has {votes[highestVoted] }</p>
    </div>
  )
}

export default App
