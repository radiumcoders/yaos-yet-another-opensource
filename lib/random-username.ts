import { nanoid } from "nanoid";

const USER = ["mango", "penguin", "owl", "cat", "lion"]

const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * USER.length);
    const randomUser = USER[randomIndex];
    const user = `${randomUser}-${nanoid(4)}`;
    return user;
}

export { getRandomUsername };