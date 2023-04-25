import Todo from "./todo/Todo";
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  // console.log(currentUser)

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }
    return children;
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={ 
          <ProtectedRoute>
            <Todo/>
          </ProtectedRoute>
        }></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
