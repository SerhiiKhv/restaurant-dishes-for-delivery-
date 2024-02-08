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
        <section className="mt-36">
            <div className="border rounded-2xl max-w-sm mx-auto p-8 ">
                <h1 className="text-center text-4xl bg-gradient-to-r from-neonNazar to-blue-600 bg-clip-text text-transparent
                font-semibold">
                    Login
                </h1>

                <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                    <input type="email" placeholder="email" value={email}
                           onChange={ev => setEmail(ev.target.value)}/>

                    <input type="password" placeholder="password" value={password}
                           onChange={ev => setPassword(ev.target.value)}/>

                    <button type="submit">Login</button>
                </form>

                {error && (
                    <div className="bg-gradient-to-br from-red-800 to-pink-400 my-4 text-center
                    text-white rounded-2xl p-2">
                        {error}
                    </div>
                )}

                <div className="text-right my-4 text-gray-500 text-sm">
                    <Link className="underline" href={'/forget-password'}>Forgot password?</Link>
                </div>

                <div className="my-4 text-gray-500 text-center">
                    or login with provider
                </div>


                <div
                    onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex gap-4 justify-center max-w-sm mx-auto cursor-pointer">
                    <Image
                        className="rounded-full"
                        src={'/google.svg.webp'} alt={"google"} width={48} height={48}/>
                </div>

                <div className="text-center my-4 text-gray-500">
                    Existing account?{' '}
                    <Link className="underline" href={'/register'}>Register here &raquo;</Link>
                </div>
            </div>
        </section>
    )
}