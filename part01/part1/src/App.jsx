const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
  const name = 'peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' age={26 + 10}/>
      <Hello name={name} age={age}/>
      <Footer />
    </div>
  )
}

export default App