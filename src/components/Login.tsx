import React, { useState, useRef } from 'react';
import { AuthModule } from '../api/auth';
import { AuthState } from '../types/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<AuthState | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loggedInUser = await AuthModule.login(email, password);
      setUser(loggedInUser);
      console.log('User logged in:', loggedInUser);
      // Redirect or update UI as needed
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
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

            <form onSubmit={handleSubmit}>
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