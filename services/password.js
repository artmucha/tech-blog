import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export default class Password {
    static async toHash(password){
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64));

        return `${buffer.toString('hex')}.${salt}`;
    };

    static async compare(storedPAssword, suppliedPassword) {
        const [hashedPassword, salt] = storedPAssword.split('.');
        const buffer = (await scryptAsync(suppliedPassword, salt, 64));

        return buffer.toString('hex') === hashedPassword;
    }
};