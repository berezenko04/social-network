export async function isUniqueUsername(username) {
    const result = await UserModel.findOne({ username: username });
    return !result;
}