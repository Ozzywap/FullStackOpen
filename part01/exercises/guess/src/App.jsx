import { useState } from 'react'

const Display = (props) => <div>{props.text}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Result = (props) => {
  if (props.guess === props.num){
  return(<div>
    <Display text='You guessed correctly!'/>
  </div>
  )}
  return (
    <div>
    <Display text='You failed!'/>
  </div>
  )
}

const App = (props) => {

  const [guess, updateGuess] = useState(1)
  const plus1 = () => updateGuess(Math.min(10, guess + 1))
  const minus1 = () => updateGuess(Math.max(1, guess - 1))
  // const checkGuess = () => {
  //   if(guess === props.num) {
  //     return (<div>correct guess</div>)
  //   } else{
  //     return (<div>
  //       you failed
  //   </div>)
  //   }
  // }
  
  return (
    <div>
      <p>Guess a number between 1 and 10. Press done when ready</p>
      <p>{guess}</p>
      <Button handleClick={plus1} text='+1'/>
      <Button handleClick={minus1} text='-1'/>
      <Result guess={guess} num = {props.num}/>
      {/* <Button handleClick={checkGuess} text='done' /> */}
    </div>
  )
}

export default App
