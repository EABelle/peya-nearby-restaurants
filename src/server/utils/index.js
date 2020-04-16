import {keysAsync} from "../data/RedisClient";

export function generateSetUserKey(encryptedToken, userId) {
    return `USER_${encryptedToken}_${userId}`;
}

export async function generateGetUserKey(encryptedToken) {
    const userTokens = await keysAsync(`USER_${encryptedToken}_*`);
    if(!userTokens || !userTokens.length) {
        return null;
    }
    return userTokens[0];
}
