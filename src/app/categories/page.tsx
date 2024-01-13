'use client'

import UserTabs from "@/components/layout/Tabs";
import {useProfile} from "@/components/UseProfile";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {CategoriesType} from "@/components/Types/CategoriesType";

export default function CategoriesPage() {

    const [newCategoryName, setNewCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const {loading, data} = useProfile();

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories(){
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    async function handleNewCategorySubmit(e: any) {
        e.preventDefault();

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/categories', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            name: newCategoryName
                        }
                    ),
                    headers: {'Content-Type': 'application/json'}
                })

                fetchCategories()
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        })

        await toast.promise(creatingPromise, {
            loading: 'Creating new category',
            success: 'Category created!',
            error: 'Error'
        })
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={data?.admin}/>

            <form className="mt-8" onSubmit={handleNewCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>New category page</label>
                        <input type="text"
                               onChange={e => setNewCategoryName(e.target.value)}/>
                    </div>

                    <div className="pb-4">
                        <button type="submit">Create</button>
                    </div>
                </div>
            </form>

            <div>
                <h2 className="text-gray-500">edit category:  </h2>
                {categories?.length > 0 && categories.map((c: CategoriesType) => (
                    <div className="bg-gray-200 rounded-xl px-4 py-2 gap-2 cursor-pointer mb-2">
                        <span key={c._id}>{c.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}