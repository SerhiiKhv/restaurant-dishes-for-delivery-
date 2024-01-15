import { model, models, Schema } from "mongoose";

const MenuItemsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemsSchema);
