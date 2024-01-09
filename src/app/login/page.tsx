"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault();

        await signIn("credentials", {email, password})
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Login
            </h1>

            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br/>
                    Please try again later
                </div>
            )}

            <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                       onChange={ev => setEmail(ev.target.value)}/>

                <input type="password" placeholder="password" value={password}
                       onChange={ev => setPassword(ev.target.value)}/>

                <button type="submit">Login</button>
            </form>

            <div className="my-4 text-gray-500 text-center">
                or login with provider
            </div>


            <button className="flex gap-4 justify-center max-w-xl mx-auto">
                <Image src={'/google.png'} alt={"google"} width={24} height={24}/>
                Login with google
            </button>

            <div className="text-center my-4 text-gray-500">
                Existing account?{' '}
                <Link className="underline" href={'/register'}>Register here &raquo;</Link>
            </div>
        </section>
    )
}