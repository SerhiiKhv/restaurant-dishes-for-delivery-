'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import Link from "next/link";
import {useEffect, useState} from "react";
import {MenuItemType} from "@/components/Types/MenuItem";

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
        <section className="mt-8 max-w-md mx-auto">
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
                    {menuItems?.length > 0 && menuItems.map((c: MenuItemType) => (
                        <div className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2">
                            <Link href={`/menu-items/edit/${c._id}`}>
                                <span key={c._id}>{c.name}</span>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}