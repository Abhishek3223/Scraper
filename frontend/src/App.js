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
// import MobileNav from './component/mobileNabar';
import Badges from './component/Badges';
import Verification from './component/Verification';

function App() {


  const [SideBarstate, setSideBarstate] = useState(false)
  const toggleSideBarState = () => {
    setSideBarstate(!(SideBarstate))
  }

  return (
    <div className="App">
      <AuthState>
        <Router>
          <Routes>
          </Routes>
          <div className="display-Area">
            <div className="sidebar-area">
              <Sidebar />
            </div>

            <div className="display-content" >
              <div className="navArea" >
                <SeacrhBar changeWidth={toggleSideBarState} />
                <Alert />
                <Badges />
              </div>

              <div className='page-content'>
                <Routes>

                  <Route exact path='/signup' element={<SignUp />} />
                  <Route exact path='/login' element={<Login />} />
                  {/* <Route exact path='/alert' element={<Alert/>} /> */}
                  <Route exact path='/' element={<Home />} />
                  <Route path='/verify/:id' element={<Verification />} />

                  <Route exact path='/dashboard' element={<Dashbord />} />
                  <Route exact path='/comment' element={<Comment />} />
                  <Route exact path='/productAnalysis' element={<ProductAnalysis />} />
                </Routes>
              </div></div>
          </div>
        </Router>
      </AuthState>
    </div >
  );
}

export default App;
