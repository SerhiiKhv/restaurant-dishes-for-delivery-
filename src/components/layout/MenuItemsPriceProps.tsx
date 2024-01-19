import React from "react";

export default function MenuItemsPriceProps({name, props, setProps}:
                                                {
                                                    name: string
                                                    props: { name: string; price: string }[],
                                                    setProps: any
                                                }) {
    function addSize() {
        setProps((oldSizes: any) => {
            return [...oldSizes, {name: '', price: ''}]
        })
    }

    function editSize(e: React.ChangeEvent<HTMLInputElement>, index: number, prop: keyof {
        name: string;
        price: number
    }) {
        const newValue = e.target.value;

        setProps((prevSizes: any )=> {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeSize(indexToRemove: number) {
        setProps((prev: any) => prev.filter((v: any, i: number) => i !== indexToRemove))
    }


    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <label>{name}</label>
            {props?.length > 0 && props.map((size, index) => (
                <div key={index} className="flex gap-2 items-end">
                    <div>
                        <label>Size name</label>
                        <input type="text" placeholder="Size name"
                               value={size.name}
                               onChange={e => editSize(e, index, 'name')}/>
                    </div>

                    <div>
                        <label>Extra price</label>
                        <input type="text" placeholder="Extra price"
                               value={size.price}
                               onChange={e => editSize(e, index, 'price')}/>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => removeSize(index)}
                            className="bg-white mb-4">x
                        </button>
                    </div>
                </div>
            ))}

            <button className=""
                    type="button"
                    onClick={addSize}>
                Add size(like medium or large)
            </button>
        </div>
    )
}