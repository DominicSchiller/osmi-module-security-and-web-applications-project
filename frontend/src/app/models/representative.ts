import { User } from "./user";

export class Representative {
    constructor(
     public _id: string,
     public personalDetails: User,
     public representedPatients: [string],
    ) {}
 }