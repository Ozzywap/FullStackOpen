import ReactDOM from 'react-dom/client'

import App from './App'
const num = Math.floor(Math.random() * 10)
  console.log(num)
ReactDOM.createRoot(document.getElementById('root')).render(<App num={num}/>)