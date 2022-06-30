export enum PatientRoutes {
    getPatient = "/api/patient/:patientId",
    getInsurance = "/api/patient/:patientId/insurance-details",
    getRepresentatives = "/api/patient/:patientId/representatives",
    removeRepresentative = "/api/patient/:patientId/representatives/:representativeId"
}