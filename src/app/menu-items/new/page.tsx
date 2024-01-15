'use client'

import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/Tabs";
import {useState} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemsPage(){

    const {loading, data} = useProfile();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")


    async function handleFormSubmit(e: any){
        e.preventDefault()

        const creatingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const data = {name, description, price, image}

                /*if (editedItems) {
                    data._id = editedCategory._id
                }*/

                //editedCategory ? 'PUT' :

                const response = await fetch('/api/menu-items', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {'Content-Type': 'application/json'}
                })

                /*setEditedCategory(null)
                setCategoryName('')
                fetchCategories()*/

                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        })

        /*loading: editedCategory ? 'Updating category' : 'Creating new category',
            success: editedCategory ? 'Updating success!' : 'Category created!',
            error: 'Error'*/

        await toast.promise(creatingPromise, {
            loading: 'Creating new item',
            success: 'Item created!',
            error: 'Error'
        })
    }


    if (loading) {
        return 'Loading user info...'
    }

    if (!data?.admin) {
        return "Not an admin"
    }

    return(
        <section>
            <UserTabs isAdmin={true}/>

            <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2">

                    <div className="bg-gray-200 m-4 rounded-2xl text-center">
                        No image
                    </div>

                    <div className="flex gap-2 items-end">
                        <div className="grow">
                            <label>Menu item name </label>
                            <input type="text" value={name}
                                   onChange={(e) => setName(e.target.value)}/>

                            <label>Description </label>
                            <input type="text" value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>

                            <label>Base price </label>
                            <input type="number" value={price}
                                   onChange={(e) => setPrice(+e.target.value)}/>
                        </div>
                    </div>
                </div>

                <button type="submit">
                    Save
                </button>
            </form>
        </section>
    )
}