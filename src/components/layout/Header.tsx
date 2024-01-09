"use client";

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export const Header = () => {
    const session = useSession()
    const status = session.status

    const userName = session.data?.user?.name;


    return (
        <header className="flex items-center justify-between">
            <Link className="text-primary font-semibold text-2xl" href="/">
                EAT AND DON'T WAKE UP
            </Link>

            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contacts</Link>
            </nav>



            <nav className="gap-2 flex items-center font-semibold">
                {status === "authenticated" && (
                    <>
                        <p>{userName}</p>
                        <button
                                onClick={() => signOut()}
                                className="bg-primary text-white px-4 py-2 rounded-full">
                            Logout
                        </button>
                    </>
                )}

                {status !== "authenticated" && (
                    <>
                        <Link href={'/login'} className="">
                            Login
                        </Link>
                        <Link href={'/register'} className="bg-primary text-white px-4 py-2 rounded-full">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}