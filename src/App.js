import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import NewNote from './pages/NewNote';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }
  return (
    <div className="App">
      {/* header  */}
      <div className="header">
        <div className="title" onClick={handleLogout}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> <h1>StkNotes</h1></Link>
        </div>
        <div className="buttons">
          {loggedIn ? (
            <>
              <button className="btn logout_btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn login_btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn signup_btn">Signup</button>
              </Link>
            </>
          )}

        </div>
      </div>

      {/* main content */}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/dashboard" element={<DashBoard loggedIn={loggedIn} />} />
          <Route path="/newnote" element={<NewNote loggedIn={loggedIn} />} />
        </Routes>
      </div>

      <div className="footer">
        <h2>StkNotes &copy; 2024</h2>
      </div>
    </div >
  );
}

export default App;
