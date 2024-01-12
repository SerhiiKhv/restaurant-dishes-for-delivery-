'use client'

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {

    const session = useSession()
    const {status} = session

    const [userName, setUserName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [userImage, setUserImage] = useState('/pizza.png')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(String(session.data?.user?.name))
            setUserImage(String(session.data?.user?.image))

            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserName(data.name)
                    setUserImage(data.image)
                    setStreetAddress(data.address)
                    setPhoneNumber(data.phone)
                })
            })
        }
    }, [session, status])

    if (status === 'loading') {
        return "Loading..."
    }

    if (status === 'unauthenticated') {
        redirect('/login')
    }

    async function handleProfileInfoUpdate(ev: any) {
        ev.preventDefault();

        const savingPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            name: userName,
                            address: streetAddress,
                            phone: phoneNumber,
                        }
                    ),
                    headers: {'Content-Type': 'application/json'}
                });

                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            } catch (error) {
                reject(error);
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile save!',
            error: 'Error save'
        })

    }


    async function handleChangePhoto(e: any) {
        const files = e.target.files
        if (files?.length === 1) {
            const data = new FormData
            data.set('files', files[0])
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

            <form className="border rounded-xl p-2" onSubmit={handleProfileInfoUpdate}>
                <div className="flex gap-4 items-center">
                    <div className="bg-gray-100 p-2 rounded-2xl items-center">
                        <div>
                            <Image src={userImage || '/pizza.png'} alt={"avatar"} width={250} height={250}
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

                        <input type="text" placeholder="Street address"
                               onChange={e => setStreetAddress(e.target.value)}
                               value={streetAddress}/>

                        <input type="text" placeholder="Phone number"
                               onChange={e => setPhoneNumber(e.target.value)}
                               value={phoneNumber}/>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
