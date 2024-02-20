import Image from "next/image";
import React, {useEffect, useState} from "react";
import {UserType} from "@/components/Types/UserType";
import {ErrorType} from "@/components/Types/Errors";
import AddedImageViaLink from "@/components/layout/AddedImageViaLink";

export default function UserProfileForm(
    {userData, onSave}: { userData: UserType | null, onSave: any }
) {

    const [userName, setUserName] = useState(userData?.name || '')
    const [userEmail, setUserEmail] = useState(userData?.email || '')
    const [streetAddress, setStreetAddress] = useState(userData?.address || '')
    const [userImage, setUserImage] = useState(userData?.image || '/pizza.png')
    const [phoneNumber, setPhoneNumber] = useState(userData?.phone || '')
    const [photoLink, setPhotoLink] = useState(userData?.image || '')
    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        setUserName(userData?.name || '')
        setUserEmail(userData?.email || '')
        setStreetAddress(userData?.address || '')
        setUserImage(userData?.image || '')
        setPhoneNumber(userData?.phone || '')
    }, [userData]);

    async function handleChangePhotoFile(e: any) {
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
        <div>
            <form className="border rounded-xl p-2 mt-4"
                  onSubmit={e =>
                      onSave(e, {name: userName, address: streetAddress, phone: phoneNumber, image: photoLink})}>
                <div className="flex gap-4 items-center">

                    <AddedImageViaLink photoLink={photoLink} setPhotoLink={setPhotoLink}
                                       image={userImage} setIsFormValid={setIsFormValid}/>

                    <div className="grow">
                        <input type="text" placeholder="First and last name"
                               onChange={e => setUserName(e.target.value)}
                               value={userName}/>

                        <input type="email" placeholder="Email" disabled={true}
                               value={userEmail}/>

                        <input type="text" placeholder="Street address"
                               onChange={e => setStreetAddress(e.target.value)}
                               value={streetAddress}/>

                        <input type="text" placeholder="Phone number"
                               onChange={e => setPhoneNumber(e.target.value)}
                               value={phoneNumber}/>
                        <button type="submit"
                                disabled={isFormValid}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}