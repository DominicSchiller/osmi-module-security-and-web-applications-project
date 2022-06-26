import { Address } from "./address";

export class HealthInsuranceDetails {
    constructor(
        public company: HealthInsurance,
        public insuranceNumber: number
    ) {}
}

export class HealthInsurance {
    constructor(
        public name: string,
        public group: string,
        public address: Address
    ) {}
}