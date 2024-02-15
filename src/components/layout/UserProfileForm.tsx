import Image from "next/image";
import React, {useEffect, useState} from "react";
import {UserType} from "@/components/Types/UserType";
import {ErrorType} from "@/components/Types/Errors";

export default function UserProfileForm(
    {userData, onSave}: { userData: UserType | null, onSave: any }
) {

    const [userName, setUserName] = useState(userData?.name || '')
    const [userEmail, setUserEmail] = useState(userData?.email || '')
    const [streetAddress, setStreetAddress] = useState(userData?.address || '')
    const [userImage, setUserImage] = useState(userData?.image || '/pizza.png')
    const [phoneNumber, setPhoneNumber] = useState(userData?.phone || '')

    const [photoLink, setPhotoLink] = useState(userData?.image || '')


    const [errors, setErrors] = useState({ photoLink: '',});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inputFocused, setInputFocused] = useState('');


    const handleInputFocus = (fieldName: string) => {
        setInputFocused(fieldName);
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
    };

    const handleInputBlur = () => {
        setInputFocused('');
        validateForm();
    };

    const validateForm = () => {
        const newErrors = {...errors}

        if (inputFocused === 'photoLink' && photoLink.trim() !== '') {
            if (!/^https:.+/.test(photoLink)) {
                newErrors.photoLink = 'photoLink is invalid.';
            }
        }

        setErrors(newErrors);
        setIsFormValid(!!newErrors.photoLink);
    };

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

    async function handleChangePhotoLink() {
        await fetch("/api/upload", {
            method: 'POST',
            body: JSON.stringify(photoLink),
            headers: {'Content-Type': 'application/json'}
        })
    }



    return (
        <div>
            <form className="border rounded-xl p-2 mt-4"
                  onSubmit={e =>
                      onSave(e, {name: userName, address: streetAddress, phone: phoneNumber, image: photoLink})}>
                <div className="flex gap-4 items-center">
                    <div className="bg-gray-100 p-2 rounded-2xl items-center">
                        <div>
                            <Image src={userImage || '/pizza.png'} alt={"avatar"} width={250} height={250}
                                   className="rounded-xl w-full h-full mb-1"/>
                        </div>
                        <label>
                            <input type="file" className="hidden" onChange={handleChangePhotoFile}/>
                            {errors.photoLink && <p className="text-red-500 -mb-4">{errors.photoLink}</p>}
                            <input type="text" className="hidden"
                                   value={photoLink}
                                   onFocus={() => handleInputFocus('photoLink')}
                                   onBlur={handleInputBlur}
                                   onChange={e => setPhotoLink(e.target.value)}/>
                          {/*  <button className="mb-4"
                            onClick={handleChangePhotoLink}>
                                Upload photo link
                            </button>*/}

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