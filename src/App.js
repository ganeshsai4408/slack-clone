import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Chat';
import { useState } from 'react';
import Login from "./Login.js";
import { useStateValue } from './StateProvider.js';


function App() {
  
  const [{user},dispatch]=useStateValue();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ) : (
          <>
            <Header />
            <div className="app_body">
              <Sidebar />
              <Routes>
                {/* Define your routes for the logged-in state */}
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/" />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
 
}

export default App;
