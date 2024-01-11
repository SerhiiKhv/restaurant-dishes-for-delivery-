"use client";

import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [creatingUser, setCreatingUser] = useState(false)
    const [error, setError] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true)
        try {
            await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({email, password, name: userName}),
                headers: {'Content-Type': 'application/json'}
            });
            setCreatingUser(false)
        } catch (e) {
            setError(true)
        }

    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>

            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br/>
                    Please try again later
                </div>
            )}

            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="name" value={userName}
                       disabled={creatingUser}
                       onChange={ev => setUserName(ev.target.value)}/>

                <input type="email" placeholder="email" value={email}
                       disabled={creatingUser}
                       onChange={ev => setEmail(ev.target.value)}/>

                <input type="password" placeholder="password" value={password}
                       disabled={creatingUser}
                       onChange={ev => setPassword(ev.target.value)}/>

                <button type="submit" disabled={creatingUser}>Register</button>
            </form>

            <div className="my-4 text-gray-500 text-center">
                or login with provider
            </div>

            <button onClick={() => signIn('google', {callbackUrl:'/'})}
                    className="flex gap-4 justify-center max-w-sm mx-auto">
                <Image src={'/google.png'} alt={"google"} width={24} height={24}/>
                Login with google
            </button>

            <div className="text-center my-4 text-gray-500">
                Existing account?{' '}
                <Link className="underline" href={'/login'}>Login here &raquo;</Link>
            </div>
        </section>
    );
}