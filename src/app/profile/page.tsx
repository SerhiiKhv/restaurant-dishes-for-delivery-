'use client'

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import React, {useState} from "react";

export default function ProfilePage() {

    const session = useSession()
    const {status} = session

    const [userName, setUserName] = useState(String(session.data?.user?.name))
    const [saveProfile, setSaveProfile] = useState(false)
    const [isSaveProfile, setIsSaveProfile] = useState(false)

    if (status === 'loading') {
        return "Loading..."
    }

    if (status === 'unauthenticated') {
        redirect('/login')
    }

    let userImage = session.data?.user?.image

    if (!userImage) {
        userImage = "/pizza.png"
    }

    async function handleProfileInfoUpdate(ev: any) {
        ev.preventDefault();
        setIsSaveProfile(true)
        setSaveProfile(false)
        const response = await fetch('/api/profile', {
            method: 'PUT',
            body: JSON.stringify({name: userName}),
            headers: {'Content-Type': 'application/json'}
        });
        setIsSaveProfile(false)
        if (response.ok) {
            setSaveProfile(true)
            setTimeout(() => setSaveProfile(false), 5000)
        }
    }

    async function handleChangePhoto(e: any) {
        const files = e?.files
        if (files?.length > 0){
            const data = new FormData
            data.set('files', files)
            await fetch("/api/upload", {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'multipart/form-data'}
            })
        }
    }

    return (
        <section className="mx-auto max-w-md">
            <h1 className="text-center text-primary text-4xl">
                Profile
            </h1>

            {saveProfile &&
                <h2 className="m-2 text-center text-2xl bg-green-100 border-green-300 rounded-2xl">
                    Profile saved
                </h2>
            }

            {isSaveProfile &&
                <h2 className="m-2 text-center text-2xl bg-blue-100 border-blue-300 rounded-2xl">
                    Saving...
                </h2>
            }


            <form className="border rounded-xl p-2" onSubmit={handleProfileInfoUpdate}>
                <div className="flex gap-4 items-center">
                    <div className="bg-gray-100 p-2 rounded-2xl items-center">
                        <div>
                            <Image src={userImage} alt={"avatar"} width={250} height={250}
                                   className="rounded-xl w-full h-full mb-1"/>
                        </div>
                        <label>
                            <input type="file" className="hidden" onChange={handleChangePhoto}/>
                            <span className="block border border-gray-400 cursor-pointer text-center rounded-xl py-1">
                                Edit
                            </span>
                        </label>
                    </div>
                    <div className="grow">
                        <input type="text" placeholder="First and last name"
                               onChange={e => setUserName(e.target.value)}
                               value={userName}/>

                        <input type="email" placeholder="Email" disabled={true}
                               value={String(session.data?.user?.email)}/>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
