import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import NewNote from './pages/NewNote';
import NotFound from './pages/NotFound';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (based on presence of token)
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };


  return (
    <div className="App">
      {/* header */}
      <div className="header">
        <div className="title">
          <Link to="/STK_Notes_Frontend" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1>StkNotes</h1>
          </Link>
        </div>
        <div className="buttons">
          {loggedIn ? (
            <>
              <Link to="/STK_Notes_Frontend/dashboard">
                <button className="btn dashboard_btn">Dashboard</button>
              </Link>

              <Link to="/STK_Notes_Frontend"><button className="btn logout_btn" onClick={handleLogout}>
                Logout
              </button></Link>

            </>
          ) : (
            <>
              <Link to="/STK_Notes_Frontend/login">
                <button className="btn login_btn">Login</button>
              </Link>
              <Link to="/STK_Notes_Frontend/signup">
                <button className="btn signup_btn">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* main content */}
      <div className="main">
        <Routes>
          {/* <Route path="/STK_Notes_Frontend" element={<Navigate to="/STK_Notes_Frontend/home" replace />} /> */}
          <Route path="/STK_Notes_Frontend" element={<Home />} />
          <Route path="/STK_Notes_Frontend/signup" element={<Signup />} />
          <Route path="/STK_Notes_Frontend/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/STK_Notes_Frontend/dashboard" element={<DashBoard loggedIn={loggedIn} />} />
          <Route path="/STK_Notes_Frontend/newnote" element={<NewNote loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <div className="footer">
        <h2>StkNotes &copy; 2024</h2>
      </div>
    </div>
  );
}

export default App;
