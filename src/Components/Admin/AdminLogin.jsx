
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "NEXORA2026") {
      onLogin();
    } else {
      setError("The password is incorrect !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950 p-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800"
      >

        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500/10 p-4 rounded-full">
            <Lock size={32} className="text-yellow-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          NEXORA ADMIN
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter your admin password
        </p>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter password"
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-transparent dark:text-white outline-none focus:border-yellow-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition"  >
          Login to Dashboard
        </button>

      </form>
    </div>
  );
};

export default AdminLogin