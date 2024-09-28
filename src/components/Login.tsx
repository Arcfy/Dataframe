import React, { useState , useRef } from 'react';
import axios from 'axios';
import { AuthState } from '../types/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthState | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      email,
      password,
      auth_type: 'header',
    };

    const config = {
      method: 'post',
      url: '/api/auth/signin', // Updated to use the proxy
      headers: {
        'Content-Type': 'application/json; utf-8',
        'Accept': 'application/json',
        'Authorization': 'JWT',
        'platform': 'pc',
        'language': 'en',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

    const handleBackdropClick = (e: React.MouseEvent) => {
    // Close the modal if the click was outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowLogin(false);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white py-1 px-4 rounded"
        onClick={() => setShowLogin(!showLogin)}
      >
        Login
      </button>

      {user && <p>Welcome, {user.ingame_name}!</p>}

      {showLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="bg-background p-8 rounded shadow-lg relative"
          >
            <button
              className="absolute top-3 right-5 text-gray-500 hover:text-gray-700"
              style={{ fontSize: "24px", fontWeight: "bold" }}
              onClick={() => setShowLogin(false)}
            >
              &times;
            </button>
            {/* Closing the login box */}
            <h3 className="text-lg mb-4">Login</h3>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black border p-2 mb-2 w-full"
                placeholder="Email"
                required
                disabled={loading}
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black border p-2 mb-4 w-full"
                placeholder="Password"
                required
                disabled={loading}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" className="bg-green-500 text-white py-1 px-4 rounded w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
