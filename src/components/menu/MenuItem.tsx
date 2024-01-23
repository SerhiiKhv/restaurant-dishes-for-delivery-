import React, {useContext} from "react";
import Image from "next/image"
import {CartContext} from "@/components/AppContext";

export const MenuItem = (menuItem: any) => {

    const {image, name, description, price} = menuItem.item

    console.log(menuItem)

    const {addToCart} = useContext(CartContext) as any

    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center
        group hover:bg-white hover:shadow-2xl hover:shadow-black/50
        transition-alt mx-auto ">
            <div>
                <Image src={image || '/pizza.png'}
                       alt={"Img menu item"}
                       width={250} height={250}
                       className="max-h-auto block mb-1 mx-auto"/>
            </div>

            <div>
                <h4 className="font-semibold text-xl my-2">
                    {name}
                </h4>

                <p className="text-gray-500 text-sm">
                    {description}
                </p>
            </div>

            <div>
                <button
                    onClick={() => addToCart(menuItem)}
                    className="mt-4 bg-primary text-white rounded-full px-4 py-3">
                    Add to cart {price}$
                </button>
            </div>
        </div>
    )
}