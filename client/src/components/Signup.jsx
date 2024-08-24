import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        const { email, username, password } = formData;

        if (!email || !username || !password) {
            window.alert("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/user/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Something went wrong');
                setLoading(false);
                return;
            }

            if (data.success === "false") {
                setError(data.message);
                setLoading(false);
                return;
            }

            setLoading(false);
            navigate('/');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md mx-auto border-2 p-10 rounded-lg bg-zinc-700 text-white">
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

                    <Label className="mt-5" value="Your Username" />
                    <TextInput
                        className="text-black"
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={formData.username}
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
                            "Sign Up"
                        )}
                    </Button>
                </form>

                <p className="text-sm mt-4">
                    Already have an account?{' '}
                    <Link to="/" className="text-cyan-500 font-semibold">
                        Sign In
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

export default SignUp;
