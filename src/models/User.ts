import { Schema, Types, model, type Document } from 'mongoose';

interface IUser extends Document {
    userId: Schema.Types.ObjectId,
    userName: string,
}

const userSchema = new Schema<IUser>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        userName: {
            type: String,
            required: true,
            maxlength: 16,
            minlength: 8,
            default: 'default text for UserName idk yet'
        },
    },
    {
        timestamps: true,
        _id: true
    }
);

const User = model('User', userSchema);

export default User;