package epapoc.patient.get_patient.tests

import data.epapoc.patient.get_patient.isAllowed
import data.epapoc.patient.get_patient.reasons
import data.epapoc.data.tests.patient.input_requests
import data.epapoc.data.errors
import data.epapoc.utils

test_isAllowed_with_correct_patientId {
    result_isAllowed := isAllowed with input as input_requests.correct_patientId
    result_isAllowed
}

test_denied_with_missing_patientId {
    result_isAllowed := isAllowed with input as input_requests.missing_patientId
    result_reasons := reasons with input as input_requests.missing_patientId
    not result_isAllowed
    utils.contains(result_reasons, errors.bad_access_patientId_missing)
}

test_denied_with_wrong_patientId {
    result_isAllowed := isAllowed with input as input_requests.wrong_patientId
    result_reasons := reasons with input as input_requests.wrong_patientId
    not result_isAllowed
    utils.contains(result_reasons, errors.bad_access_patientId_mismatch)
}