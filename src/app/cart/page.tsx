'use client'

import {SectionHeader} from "@/components/layout/SectionHeader";
import React, {useContext} from "react";
import {CartContext} from "@/components/AppContext";
import Image from "next/image";

export default function CartPage() {

    const {cartProducts} = useContext(CartContext) as any;

    console.log(cartProducts)

    return (
        <section className="mt-8">
            <SectionHeader mainHeader="Cart"/>
            <div className="grid grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product: any) => (
                        <div className="flex items-center gap-4 mb-4 border-b py-2">
                            <div>
                                <Image src={product.item.image || '/pizza.png'}
                                       alt={"Img menu item"}
                                       width={250} height={250}
                                       className="w-24"/>
                            </div>
                            <div>
                                <h3> {product.item.name}</h3>

                                {product.size && (
                                    <div>
                                        Size: <span>{product.size}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                   right
                </div>
            </div>
        </section>
    )
}