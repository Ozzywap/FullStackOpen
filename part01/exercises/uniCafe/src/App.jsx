import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = ({ stats }) => {
  const [good, neutral, bad] = stats;
  const all = good + neutral + bad;
  if (all) {
    return (
      <div>
        {/* <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={(good / all) * 100} /> */}
        {/* <p>positive {good / all} %</p> */}
        <table>
          <tbody>
            <tr>
              <td>
                <StatisticLine text="good" value={good} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="neutral" value={neutral} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="bad" value={bad} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="all" value={all} />
              </td>
            </tr>
            <tr>
              <td>
                <StatisticLine text="average" value={(good - bad) / all} />
              </td>
            </tr>
            <tr>
              <td><StatisticLine text="positive" value={(good / all) * 100}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h4>No feedback given</h4>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={"good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
      <h2>statistics</h2>
      <Statistics stats={[good, neutral, bad]} />
    </div>
  );
};

export default App;
