import { Route, Router, Routes } from "react-router-dom";
import AddEntry from "./components/AddEntry";
import Header from "./components/Header";
import Listing from "./components/Listing";
import { EntriesProvider } from "./context/EntriesContext";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/Signup";

function App() {
  return (
    <EntriesProvider>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
      
    </EntriesProvider>
  );
}

export default App;
