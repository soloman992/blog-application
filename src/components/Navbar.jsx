import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            {/* <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">Projects</NavLink> */}

            {isLoggedIn && (
                <>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/create">Create Post</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </>
            )}
        </nav>
    );
}

export default Navbar;
