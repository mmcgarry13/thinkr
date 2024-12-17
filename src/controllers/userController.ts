import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js'

// Count of all Users
export const userCount = async () => {
    const numberOfUsers = await User.aggregate([
        {
            $group: {
                _id: null,
                Total_Users: { $count: {} },
            }
        }
    ])
    return numberOfUsers;
}

// get all users and show userCount
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            userCount: await userCount(),
        }
        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// get user by userId
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({
                message: 'User not found 😭'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// create user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that id found 😔' });
        }

        const thought = await Thought.findOneAndDelete(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but they had no thoughts 🤯',
            });
        }

        return res.json({ message: 'User deleted! 😎' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}