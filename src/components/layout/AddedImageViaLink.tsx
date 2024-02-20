import Image from "next/image";
import React, {useState} from "react";
import {Delete} from "@/components/icons/Delete";

export default function AddedImageViaLink(
    {photoLink, image, setPhotoLink, setIsFormValid}:
        {
            image: string,
            photoLink: string,
            setPhotoLink: any,
            setIsFormValid: any
        }
) {

    const [errors, setErrors] = useState({photoLink: '',});
    const [inputFocused, setInputFocused] = useState('');

    const handleInputFocus = (fieldName: string) => {
        setInputFocused(fieldName);
        setErrors(prev => ({...prev, [fieldName]: ''}));
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

    const clearPhotoLink = () => {
        setPhotoLink('')
    }

    return (
        <div className="bg-gray-100 p-2 rounded-2xl items-center mb-2">
            <div>
                <Image src={image || '/pizza.png'} alt={"avatar"} width={250} height={250}
                       className="rounded-xl w-full h-full mb-1 aspect-square object-cover"/>
            </div>
            <div>
                <label>
                    <input type="file" className="hidden" disabled={true}/>
                    {errors.photoLink && <p className="text-red-500 -mb-4">{errors.photoLink}</p>}
                    <div className="grid grid-cols-[5fr,1fr] items-end gap-1">
                        <input type="text"
                               value={photoLink}
                               onFocus={() => handleInputFocus('photoLink')}
                               onBlur={handleInputBlur}
                               onChange={e => setPhotoLink(e.target.value)}/>

                        <button
                            type="button"
                            className="delete px-2 mb-4"
                            onClick={clearPhotoLink}>
                            <Delete className="h-5 w-5"/>
                        </button>
                    </div>


                    {/*  <button className="mb-4"
                            onClick={handleChangePhotoLink}>
                                Upload photo link
                            </button>*/}

                    <span className="block border border-gray-400 cursor-pointer text-center rounded-xl py-1 button">
                         Edit
                    </span>
                </label>
            </div>
        </div>
    )
}