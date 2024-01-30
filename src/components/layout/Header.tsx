"use client";

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export const Header = () => {
    const session = useSession()
    const status = session.status

    const userData = session.data?.user
    let userName = userData?.name || userData?.email

    const {cartProducts} = useContext(CartContext) as any;

    if (userName && userName.includes(" ")) {
        userName = userName?.split(' ')[0]
    }

    return (
        <header className="flex items-center justify-between">
            <Link className="text-primary font-semibold text-2xl" href="/">
                EAT AND DON'T WAKE UP
            </Link>

            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                <Link href={'/'}>Home</Link>
                <Link href={'menu'}>Menu</Link>
                <Link href={'#about'}>About</Link>
                <Link href={'#contact'}>Contacts</Link>
            </nav>


            <nav className="gap-2 flex items-center font-semibold px-2">
                {status === "authenticated" && (
                    <>
                        <Link href={'/profile'}><p>{userName}</p></Link>

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

                <Link href={'/cart'} className="relative">
                    <ShoppingCart/>
                    <span className="absolute bg-primary -top-2 -right-4 text-white
                    text-xs py-1 px-2 rounded-full leading-3">
                    {cartProducts.length}
                    </span>
                </Link>
            </nav>
        </header>
    )
}