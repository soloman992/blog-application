import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blog-backend-t8ey.onrender.com/api/users/register', { username, email, password });
      alert('Signup successful!');
      window.location.href = '/blog-application/login';

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;