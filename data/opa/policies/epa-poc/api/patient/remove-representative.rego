package epapoc.patient.remove_representative

import data.epapoc.patient.get_patient
import data.epapoc.common.aal.aal3
import input.fetchedData
import input.attributes.request
import data.epapoc.data.errors
import data.epapoc.utils

default isAllowed := false

isAllowed {
    # are token & patientId correct
    get_patient.isAllowed
    # && has access level 2
    aal3.isAllowed
    # && patient data does exist
    utils.has_key(fetchedData, "patient")
    not is_null(fetchedData.patient)
    # && representative data exist
    utils.has_key(fetchedData, "representative")
    not is_null(fetchedData.representative)
    # && representative is contained in patient's list of representatives
    utils.contains(fetchedData.patient.representatives, request.params.representativeId)
}

reasons := reasons {
    not isAllowed

    patientReasons := { reason |
        not isAllowed
        reasons := get_patient.reasons
        reasons # check if reasons exist
        reason := reasons[_]
    }

    aal3Reasons := { reason |
        not isAllowed
        reasons := aal3.reasons
        reasons # check if reasons exist
        reason := reasons[_]
    }

    noPatientDataReason1 := { reason |
        not isAllowed
        not utils.has_key(fetchedData, "patient")
        reason := errors.bad_access_no_patient_data
    }

    noRepresentativeDataReason1 := { reason |
        not isAllowed
        not utils.has_key(fetchedData, "representative")
        reason := errors.bad_access_no_representative_data
    }

    noPatientDataReason2 := { reason |
        not isAllowed
        is_null(fetchedData.patient)
        reason := errors.bad_access_no_patient_data
    }

    noRepresentativeDataReason2 := { reason |
        not isAllowed
        is_null(fetchedData.representative)
        reason := errors.bad_access_no_representative_data
    }

    noRepresentativeOfPatientError := { reason |
        not isAllowed
        not utils.contains(fetchedData.patient.representatives, request.params.representativeId)
        reason := errors.bad_access_no_representative_of_patient
    }

    reasons := patientReasons | aal3Reasons | noPatientDataReason1 | noRepresentativeDataReason1 | noPatientDataReason2 | noRepresentativeDataReason2 | noRepresentativeOfPatientError
}