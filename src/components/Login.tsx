import { useState, useRef } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Reference for the modal content


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(""); // Reset the error message
    setLoginSuccess(false); // Reset success status
    try {
      const response = await fetch("https://api.warframe.market/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_type: "cookie",
          email: email,
          password: password,
          device_id: "device_id_placeholder",
        }),
      });

      if (response.ok) {
        // If the login is successful
        setLoginSuccess(true);
        setShowLogin(false); // Close modal on success if desired
      } else {
        // If the login fails
        const data = await response.json();
        setLoginError(data.message || "Login failed, please check your credentials.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
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

      {showLogin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div ref={modalRef} className="bg-background p-8 rounded shadow-lg relative"> 
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black border p-2 mb-2 w-full"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black border p-2 mb-4 w-full"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-1 px-4 rounded w-full"
              >
                Sign In
              </button>
            </form>

            {/* Error Message */}
            {loginError && (
              <p className="text-red-500 mt-4">{loginError}</p>
            )}

            {/* Success Message */}
            {loginSuccess && (
              <p className="text-green-500 mt-4">Login successful!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;