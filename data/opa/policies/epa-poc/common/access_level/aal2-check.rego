package epapoc.common.aal.aal2

import data.epapoc.common.jwt
import input.attributes.request
import data.epapoc.data.errors

isAllowed {
    payload := jwt.get_token_payload(request)
    aacl_value := to_number(replace(payload.acr, "epa-poc-aal", ""))
    aacl_value >= 2
}

deny[errors.access_level_2_required] {
    not isAllowed
    payload := jwt.get_token_payload(request)
    aacl_value := to_number(replace(payload.acr, "epa-poc-aal", ""))
    not aacl_value >= 2
}

reasons := reasons {
    reasons := deny
}