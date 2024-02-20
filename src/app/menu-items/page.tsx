'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {MenuItemType} from "@/components/Types/MenuItem";
import Image from "next/image";

export default function MenuItemsPage() {

    const {loading, data} = useProfile();

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetchMenuItems()
    }, [])

    function fetchMenuItems() {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItem => {
                setMenuItems(menuItem)
            })
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="pt-5">
                <div>
                    <Link href={'/menu-items/new'}
                          className="button">
                        Create new menu item
                    </Link>
                </div>

                <div>
                    <h2 className="text-gray-500">Menu items: </h2>
                    <div className="grid grid-cols-3 gap-2">
                        {menuItems?.length > 0 && menuItems.map((c: MenuItemType) => (
                            <div className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2 text-center"
                                 key={c._id}>
                                <Link href={`/menu-items/edit/${c._id}`}>
                                    <Image src={c.image || '/pizza.png'} alt={"Img menu item"} width={250} height={250}
                                           className="rounded-xl mb-1 aspect-square object-cover"/>
                                    <span>{c.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}