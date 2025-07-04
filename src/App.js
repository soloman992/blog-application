import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import '../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/create" element={<CreatePost token={token} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;