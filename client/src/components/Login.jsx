import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useAuth } from '../context/Auth';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const { login } = useAuth(); // Uncomment if using Auth context

    // Handle change function
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = formData;

        if (!email || !password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/user/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok || data.success === "false") {
                setError(data.message || 'Login failed');
                setLoading(false);
                return;
            }

            // login(data); // Uncomment if using Auth context
            localStorage.setItem('user', JSON.stringify(data));
            setLoading(false);
            navigate('/home');
        } catch (err) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="relative w-full max-w-md mx-auto border-2 p-10 rounded-lg bg-zinc-700 text-white shadow-lg">
                <form onSubmit={handleSubmit}>
                    <Label className="mt-5" value="Your Email" />
                    <TextInput
                        className="text-black"
                        type="email"
                        placeholder="your@gmail.com"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Label className="mt-5" value="Your Password" />
                    <TextInput
                        className="text-black"
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        className="mt-5 w-full bg-gradient-to-r from-lime-400 to-green-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner className="text-sm mr-2" /> Loading...
                            </>
                        ) : (
                            "Log In"
                        )}
                    </Button>
                </form>

                <p className="text-sm mt-4">
                    Don't have an account?{' '}
                    <Link to="/signUp" className="text-cyan-500 font-semibold">
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <Alert className="mt-5" color="failure">
                        {error}
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default LogIn;
