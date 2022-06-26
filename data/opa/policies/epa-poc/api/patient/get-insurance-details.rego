package epapoc.patient.get_insurance_details

import data.epapoc.patient.get_patient
import data.epapoc.common.aal.aal2
import data.epapoc.data.errors
import data.epapoc.utils
import input.attributes.request

default isAllowed := false

isAllowed {
    # are token & patientId correct
    get_patient.isAllowed
    # && has access level 2
    aal2.isAllowed
}

reasons := reasons {
    not isAllowed

    patientReasons := { reason |
        not isAllowed
        reasons := get_patient.reasons
        reasons # check if reasons exist
        reason := reasons[_]
    }

    aal2Reasons := { reason |
        not isAllowed
        reasons := aal2.reasons
        reasons # check if reasons exist
        reason := reasons[_]
    }

    reasons := patientReasons | aal2Reasons
}