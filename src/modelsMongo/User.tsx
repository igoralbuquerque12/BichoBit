import mongoose, { Schema, model } from "mongoose"

export interface UserInterface {
    _id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<UserInterface>({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const User = mongoose.models?.User || model<UserInterface>("User", UserSchema)

export default User