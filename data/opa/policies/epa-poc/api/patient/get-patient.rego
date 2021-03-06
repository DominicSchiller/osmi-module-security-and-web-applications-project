package epapoc.patient.get_patient

import data.epapoc.data.errors
import data.epapoc.utils
import data.epapoc.common.jwt
import input.attributes.request
import input.attributes.request.http

default isAllowed := false

isAllowed {
  # is token correct
  jwt.isAllowed
  ## && has patientId
  utils.has_key(request.params, "patientId")
  # && is patientId match
  payload := jwt.get_token_payload(request)
  payload.sub == request.params.patientId
}

reasons := reasons {
  not isAllowed
  jwtReasons := jwt.reasons

  noPatientIdReason := { reason |
    not isAllowed
    not utils.has_key(request.params, "patientId")
    reason := errors.bad_access_patientId_missing
  }
  wrongPatientIdReason := { reason |
    not isAllowed
    payload := jwt.get_token_payload(request)
    not payload.sub == request.params.patientId
    reason := errors.bad_access_patientId_mismatch
  }

  reasons := jwtReasons | noPatientIdReason | wrongPatientIdReason
}

