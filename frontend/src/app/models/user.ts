import { Address } from "./address";
import { Gender } from "./gender";

export class User {
    constructor(
        public  title: string,
        public firstName: string,
        public lastName: string,
        public age: number,
        public gender: Gender,
        public address: Address,
        public email: string,
        public phone: string,
        public birthday: Date
    ) {}
}