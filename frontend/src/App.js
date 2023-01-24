import Sidebar from './component/Sidebar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './component/Login';
import SeacrhBar from './component/SeacrhBar';
import ProductAnalysis from './component/productAnalysis';
import AuthState from './context/notes/authState';
import React, { useState } from 'react'
import Home from './component/home';
import SignUp from './component/SIgnup';
import Dashbord from './component/Dashbord';
import Alert from './component/alert';
import { Comment } from './component/Comment';

function App() {


  const [SideBarstate, setSideBarstate] = useState(false)
  const toggleSideBarState = () => {
    setSideBarstate(!(SideBarstate))
  }

  return (
    <div className="App">
      <AuthState>
        <Router>
          <div className="navArea" >
            <SeacrhBar changeWidth={toggleSideBarState} />
            <Alert />
          </div>
          <div className="display-Area">

            <div style={!SideBarstate ? { "width": "5%" } : { "width": "12%" }} className="sidebar-area">
              <Sidebar />
            </div>

            <div className="display-content"
              style={!SideBarstate ? { "width": "95%", "marginLeft": "0.5%" } : { "width": "88%" }}
            >

              <Routes>

                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                {/* <Route exact path='/alert' element={<Alert/>} /> */}
                <Route exact path='/' element={<Home />} />
                <Route exact path='/dashboard' element={<Dashbord />} />
                <Route exact path='/comment' element={<Comment />} />
                <Route exact path='/productAnalysis' element={<ProductAnalysis />}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthState>
    </div >
  );
}

export default App;
