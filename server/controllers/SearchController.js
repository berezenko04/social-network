import UserModel from '../schemas/user.js'

export const searchByUser = async (req, res) => {
    try {
        const targetUsername = req.query.username;

        const regex = new RegExp(targetUsername, 'i');

        const exactMatchUsers = await UserModel.find({ username: targetUsername });

        const partialMatchUsers = await UserModel.find({ username: { $regex: regex } })
            .limit(10)

        const allUsers = [...exactMatchUsers, ...partialMatchUsers];
        const uniqueUsers = Array.from(new Set(allUsers.map(user => user._id)))
            .map(id => allUsers.find(user => user._id === id));

        res.status(200).json({
            users: uniqueUsers,
            message: 'User search successful',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
}