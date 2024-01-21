//models
import FollowModel from '../schemas/follows.js'
import UserModel from '../schemas/user.js'


export const follow = async (req, res) => {
    try {
        const userId = req.userId;
        const targetId = req.query.userId;
        const user = await UserModel.findById(userId);

        if (userId === targetId) {
            res.status(404).json({
                message: "You can't follow yourself"
            })
        }

        if (!user) {
            res.status(404).json({
                message: "User is not found",
            });
        }

        const updateFollowing = async (userId, targetId, variant, operation) => {
            if (variant === 'followers') {
                await FollowModel.findOneAndUpdate(
                    { user: userId },
                    { [operation]: { followers: targetId } }
                );
            } else if (variant === 'following') {
                await FollowModel.findOneAndUpdate(
                    { user: userId },
                    { [operation]: { following: targetId } }
                );
            }
        };

        const updateFollowersCount = async (userId, targetId, increment) => {
            await UserModel.findByIdAndUpdate(
                userId,
                { $inc: { following: increment ? 1 : -1 } }
            );

            await UserModel.findByIdAndUpdate(
                targetId,
                { $inc: { followers: increment ? 1 : -1 } }
            );
        };

        const followItemUser = await FollowModel.findOne({ user: userId });

        if (followItemUser.following.includes(targetId)) {
            await updateFollowing(userId, targetId, 'following', '$pull');
            await updateFollowing(targetId, userId, 'followers', '$pull');
            await updateFollowersCount(userId, targetId, false);
        } else {
            await updateFollowing(userId, targetId, 'following', '$push');
            await updateFollowing(targetId, userId, 'followers', '$push');
            await updateFollowersCount(userId, targetId, true);
        }

        res.status(200).json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const isFollowed = async (req, res) => {
    try {
        const userId = req.userId;
        const targetId = req.query.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const followItem = await FollowModel.findOne({ user: userId });

        if (followItem.following.includes(targetId)) {
            res.status(200).json({ isFollowed: true });
        } else {
            res.status(200).json({ isFollowed: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        })
    }
}
