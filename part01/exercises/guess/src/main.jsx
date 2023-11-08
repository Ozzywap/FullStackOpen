import ReactDOM from "react-dom/client";

import App from "./App";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const random = getRandomInt(1, 10);
ReactDOM.createRoot(document.getElementById("root")).render(
  <App num={random} getRandomInt={getRandomInt} />
);
