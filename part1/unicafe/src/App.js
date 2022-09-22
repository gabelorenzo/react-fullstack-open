import { useState } from 'react'

const StatisticsLine = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral, scores, calcAvg}) => {
  if (scores.length === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      {/* <h1>Statistics</h1>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="Neutral" value={neutral} />
      <p>All {scores.length}</p>
      <p>Avg. {calcAvg(scores).toFixed(1)}</p>
      <p>Positive { (good / scores.length).toFixed(1) }</p> */}
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="Neutral" value={neutral} />
          <tr>
            <td>All</td>
            <td>{scores.length}</td>
          </tr>
          <tr>
            <td>Avg.</td>
            <td>{calcAvg(scores)}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{ (good / scores.length)}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
};

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [scores, setScores] = useState([]);

  const getAddScoreEventHandler = (score) => {
    switch (score.toLowerCase()) {
      case "good":
        return () => {
          setScores(scores.concat(1));
          setGood(good + 1);
        }
        break;
      case "bad":
        return () => {
          setScores(scores.concat(-1));
          setBad(bad + 1);
        }
        break;
      case "neutral":
        return () => {
          setScores(scores.concat(0));
          setNeutral(neutral + 1);
        }
        break;
    }
  };

  const calcAvg = (scores) => {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button label="Good" onClick={getAddScoreEventHandler('good')} />
      <Button label="Bad" onClick={getAddScoreEventHandler('bad')} />
      <Button label="Neutral" onClick={getAddScoreEventHandler('neutral')} />

      <Statistics good={good} bad={bad} neutral={neutral} scores={scores} calcAvg={calcAvg} />
    </div>
  )
}

export default App
