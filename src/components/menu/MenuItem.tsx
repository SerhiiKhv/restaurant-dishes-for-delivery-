export const MenuItem = () => {
    return(
        <div className="bg-gray-300 p-4 rounded-lg text-center
        group hover:bg-white hover:shadow-2xl hover:shadow-black/50
        transition-alt">
            <img src={"/pizza.png"}/>

            <h4 className="font-semibold text-xl my-2">Pepperoni Pizza</h4>

            <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit amet, consecetetur adipisiction elit
            </p>

            <button className="mt-4 bg-primary text-white rounded-full px-4 py-3">Add to cart 12$</button>
        </div>
    )
}