import { HealthInsuranceDetails } from "./health_insurance"
import { User } from "./user"

export class Patient {
   constructor(
    public _id: string,
    public personalDetails: User,
    public doctors: [string],
    public healthInsurance?: HealthInsuranceDetails,
    public bodyPhysics?: BodyPhysics,
   ) {}
}

export class BodyPhysics {
    constructor(
        public bloodType: string,
        public weight: number,
        public height: number
    ) {}
}