import { HealthFacility } from "./health_facility"
import { User } from "./user"

export class Doctor {
   constructor(
    public _id: string,
    public personalDetails: User,
    public discipline: string,
    public facility: HealthFacility,
    public patients: [string],
   ) {}
}