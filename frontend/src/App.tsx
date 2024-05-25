import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/Home/Home";
import AddUser from "./Pages/addUser/addUser";
import UpdateUser from "./Pages/UpdateUser/updateUser";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add/user' element={<AddUser />} />
        <Route path='/users/:id' element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
