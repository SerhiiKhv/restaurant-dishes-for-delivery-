'use client'

import React, {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTitle from "@/components/menu/MenuItemTitle";
import Image from "next/image";

export const MenuItem = (menuItem: any) => {
    const {
        image, name, description,
        price, sizes, ingredients
    } = menuItem.item

    const {addToCart} = useContext(CartContext) as any

    const [showPopUp, setShowPopUp] = useState(true)
    const [selectedSize, setSelectedSize] = useState(null)

    function handleAddToCartButtonClick() {
        if (sizes.length === 0 && ingredients.length === 0) {
            addToCart(menuItem)
            toast.success('Added to cart!')
        } else {
            setShowPopUp(true)
        }
    }

    return (
        <>
            {showPopUp && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-h-screen overflow-y-scroll">
                        <Image
                            src={image || '/pizza.png'} alt={name}
                            width={300} height={200}
                            className="mx-auto"/>
                        <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                        {sizes?.length > 0 && (
                            <div className="p-2">
                                <h3 className="text-center text-gray-700">Pick your size</h3>
                                {sizes.map((size: any) => (
                                    <label className="flex items-center p-4 border rounded-md mb-1 gap-2">
                                        <input
                                            type="radio"
                                            onClick={() => setSelectedSize(size.price)}
                                            //checked={selectedSize?.name === size.name}
                                            name="size"/>
                                        {size.name} ${size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        {ingredients?.length > 0 && (
                            <div className="p-2">
                                <h3 className="text-center text-gray-700">Pick your size</h3>
                                {ingredients.map((ingredient: any) => (
                                    <label className="flex items-center p-4 border rounded-md mb-1 gap-2">
                                        <input type="checkbox" name="size"/>
                                        {ingredient.name} +${ingredient.price}
                                    </label>
                                ))}
                            </div>
                        )}

                        <button type="button"
                                className="">
                            Add to cart "selected proce"
                        </button>
                    </div>
                </div>
            )}
            <MenuItemTitle onAddToCart={handleAddToCartButtonClick} item={menuItem.item}/>
        </>
    )
}