import React, {useEffect, useState} from "react";
import {ExtraPriceType, MenuItemType} from "@/components/Types/MenuItem";
import MenuItemsPriceProps from "@/components/layout/MenuItemsPriceProps";
import {CategoriesType} from "@/components/Types/CategoriesType";

export default function MenuItemForm({onSubmit, menuItem}: { onSubmit: any, menuItem: MenuItemType | null }) {

    const [_id, setId] = useState(menuItem?._id || "")
    const [name, setName] = useState(menuItem?.name || "")
    const [description, setDescription] = useState(menuItem?.description || "")
    const [price, setPrice] = useState(menuItem?.price || "")
    const [image, setImage] = useState(menuItem?.image || "")
    const [sizes, setSizes] = useState<ExtraPriceType[]>(menuItem?.sizes || []);
    const [ingredients, setIngredients] = useState<ExtraPriceType[]>(menuItem?.ingredients || []);
    const [category, setCategory] = useState(menuItem?.category || "");
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        setName(menuItem?.name || "")
        setDescription(menuItem?.description || "")
        setPrice(menuItem?.price || "")
        setImage(menuItem?.image || "")
        setId(menuItem?._id || "")
        setSizes(menuItem?.sizes || [])
        setIngredients(menuItem?.ingredients || [])
        setCategory(menuItem?.category || "")
    }, [menuItem]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }, []);


    return (
        <form className="mt-8 max-w-md mx-auto"
              onSubmit={e => onSubmit(e,
                  {_id, name, description, price, image, sizes, ingredients, category}
              )}
        >
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

                        <label>Category</label>
                        <select value={category}
                        onChange={e => setCategory(e.target.value)}>
                            {categories?.length > 0 && categories.map((c: CategoriesType) => (
                                <option value={c._id}>{c.name}</option>
                            ))}
                        </select>


                        <label>Base price </label>
                        <input type="number" value={price}
                               onChange={(e) => setPrice(+e.target.value)}/>
                    </div>
                </div>
            </div>

            <MenuItemsPriceProps name={'Sizes'}
                                 props={sizes}
                                 setProps={setSizes}
                                 buttonName={'Add item size'}/>

            <MenuItemsPriceProps name={'Extra ingredients'}
                                 props={ingredients}
                                 setProps={setIngredients}
                                 buttonName={'Add ingredients prices'}/>

            <button type="submit">
                Save
            </button>
        </form>
    )
}