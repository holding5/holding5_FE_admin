import { Route, Routes } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";
import "./App.css";
import Main from "./pages/Main";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </>
  );
}

export default App;
