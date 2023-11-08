import { useState } from "react";

const Display = (props) => <div>{props.text}</div>;

const Result = (props) => {
  if (props.result) {
    return (
      <div>
        <Display text="You guessed correctly!" />
        <button onClick={props.reset}>play again</button>
      </div>
    );
  }
  return (
    <div>
      <div>{`You failed! The number was ${props.guess}`}</div>
      <button onClick={props.reset}>play again</button>
    </div>
  );
};

const App = (props) => {
  const [userGuess, updateUserGuess] = useState("");
  const [value, updateValue] = useState(props.num);
  const [guessResult, updateGuessResult] = useState(false);
  const [userGuessed, updateUserGuessed] = useState(false);

  const displayResult = () => {
    if (userGuessed) {
      return <Result result={guessResult} reset={reset} guess={value} />;
    }
  };

  const displaySubmitBtn = () => {
    if (!userGuessed) {
      return (
        <div>
          <form onSubmit={makeGuess}>
            <div>
              guess:{" "}
              <input
                type="number"
                value={userGuess}
                onChange={handleGuessChange}
              />
            </div>
          </form>
          <button type="submit" onClick={makeGuess}>
            submit
          </button>
        </div>
      );
    }
  };

  const pickRandom = () => {
    while (true) {
      const possibleNext = props.getRandomInt(1, 10);
      if (possibleNext !== value) {
        return possibleNext;
      }
    }
  };

  const reset = () => {
    const newGuess = pickRandom();
    updateValue(newGuess);
    updateGuessResult(false);
    updateUserGuessed(false);
  };

  const makeGuess = (event) => {
    event.preventDefault();
    updateUserGuessed(true);
    Number(userGuess) === value
      ? updateGuessResult(true)
      : updateGuessResult(false);
    updateUserGuess("");
  };

  const handleGuessChange = (event) => {
    updateUserGuess(event.target.value);
  };

  return (
    <div>
      <p>Guess a number between 1 and 10</p>
      {displaySubmitBtn()}
      {displayResult()}
    </div>
  );
};

export default App;
