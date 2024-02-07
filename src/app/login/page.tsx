"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<String>('')
    const router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.replace("/");
        }
    }, [session, router]);

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (!password || password.length < 0) {
            setError("Password is invalid");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
            if (res?.url) router.replace("/");
        } else {
            setError("");
        }
    };



    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Login
            </h1>

            {error && (
                <div className="my-4 text-center">
                    {error}
                </div>
            )}

            <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                       onChange={ev => setEmail(ev.target.value)}/>

                <input type="password" placeholder="password" value={password}
                       onChange={ev => setPassword(ev.target.value)}/>

                <button type="submit">Login</button>
            </form>

            {/*<div className="text-center my-4 text-gray-500">
                Forgot password?
                <Link className="underline" href={'/forget-password'}>Forgot password here &raquo;</Link>
            </div>*/}

            <div className="my-4 text-gray-500 text-center">
                or login with provider
            </div>


            <button
                onClick={() => signIn('google', {callbackUrl: '/'})}
                type="button"
                className="flex gap-4 justify-center max-w-sm mx-auto">
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