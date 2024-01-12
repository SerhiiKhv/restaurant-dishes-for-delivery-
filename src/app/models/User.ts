import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        validate: (pass: string) => {
            if (!pass?.length || pass.length < 5) {
                throw new Error('password must be at least 5 characters');
            }
        }
    },
    name: {type: String, required: true},
    address: {type: String},
    phone: {type: String},
});

UserSchema.post('validate', function (user){
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})

export const User = models.User || model("User", UserSchema);
