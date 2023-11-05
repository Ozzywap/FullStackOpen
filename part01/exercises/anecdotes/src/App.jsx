import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map((_) => 0));
  const [mostVotes, setMostVotes] = useState(0);

  const pickRandom = () => {
    while (true) {
      const possibleNext = Math.floor(Math.random() * anecdotes.length);
      if (possibleNext !== selected) return possibleNext;
    }
  };

  const voteSelected = () => {
    const votes_copy = [...votes];
    votes_copy[selected] += 1;
    setVotes(votes_copy);

    if (votes_copy[selected] > votes[mostVotes]) {
      setMostVotes(selected);
    }
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={() => setSelected(pickRandom())}>next anecdote</button>
        <button onClick={() => voteSelected()}>vote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
    </div>
  );
};

export default App;
