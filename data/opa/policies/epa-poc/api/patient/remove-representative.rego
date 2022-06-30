package epapoc.patient.remove_representative

import data.epapoc.patient.get_patient
import data.epapoc.common.aal.aal3

default isAllowed := false

isAllowed {
    # are token & patientId correct
    get_patient.isAllowed
    # && has access level 2
    aal3.isAllowed
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

    reasons := patientReasons | aal3Reasons
}