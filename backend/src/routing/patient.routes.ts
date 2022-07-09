export enum PatientRoutes {
    getPatient = "/api/patient/:patientId",
    getInsurance = "/api/patient/:patientId/insurance-details",
    getRepresentatives = "/api/patient/:patientId/representatives",
    getRecords = "/api/patient/:patientId/records",
    removeRepresentative = "/api/patient/:patientId/representatives/:representativeId"
}