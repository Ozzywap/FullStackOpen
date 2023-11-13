import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const api_key = import.meta.env.VITE_SOME_KEY;
ReactDOM.createRoot(document.getElementById("root")).render(
  <App api_key={api_key} />
);
