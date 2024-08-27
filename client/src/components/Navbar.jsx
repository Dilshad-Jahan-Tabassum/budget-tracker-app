import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/Auth';

export default function Navbar() {
  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  const gotoSignOut = async () => {
    const yesDelete = window.confirm("Are you sure you want to sign out?");
    if (yesDelete) {
      try {
        const res = await fetch('http://localhost:3000/api/user/auth/logout', { 
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("Error:", error);
        } else {
          // logout();
          localStorage.clear();
          navigate('/');
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  // console.log(user, "User in Navbar"); 

  return (
    <div className="bg-violet-700/30 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 text-white">
        <h2 className="flex items-center italic">
          <img src="/logo.svg" height="40" width="40" alt="Logo" />
          <span>Budget App</span>
        </h2>
        <div className="flex items-center gap-4">
          <h2>Dilshad</h2>
          <Button onClick={gotoSignOut}>Sign Out</Button>
        </div>
      </div>
    </div>
  );
}