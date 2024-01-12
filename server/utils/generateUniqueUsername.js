//validation
import { isUniqueUsername } from '../validations/isUniqueUsername.js';

export async function generateUniqueUsername(name) {
    let baseUsername = name.replace(/\s+/g, '').toLowerCase().slice(0, 15);
    let username = baseUsername;
    let counter = 1;

    while (!(await isUniqueUsername(username))) {
        username = `${baseUsername}${counter}`;
        counter++;
    }

    return username;
}