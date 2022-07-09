import { Doctor } from "./doctor";
import { Patient } from "./patient";

export enum RecordType {
    certificateOfDisability = "Arbeitsunfähigkeitsbescheinigung",
    medicalReport = "Arztbrief",
    diagnosticFindings = "Befund",
    prescription = "Rezept",
    referral = "Überweisung",
}

export class Record {
    constructor(
        public patient: string,
        public doctor: Doctor,
        public date: Date,
        public type: RecordType,
        public content: string
    ) {}
}