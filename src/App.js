import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";
import useAutoLogout from "./hooks/useAutoLogout";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useAutoLogout(30);

  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          {/* ✅ Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/posts/:id" element={<ViewPost />} />

          {/* ✅ Protected routes */}
          <Route
            path="/create"
            element={
              <RequireAuth>
                <CreatePost token={token} />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <RequireAuth>
                <EditPost />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
