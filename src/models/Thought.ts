import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtId: Schema.Types.ObjectId,
    text: string,
    timeStamp: Date,
    createdBy: Schema.Types.ObjectId
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        text: {
            type: String,
            required: true,
            maxlength: 500,
            minlength: 1,
            default: 'default text for Thought idk yet'
        },
        timeStamp: {
            type: Date
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    {
        timestamps: true,
        _id: true
    }
);

const Thought = model('Thought', thoughtSchema);

export default Thought;