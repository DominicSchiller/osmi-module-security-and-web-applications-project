package epapoc.common.aal.aal3

import data.epapoc.common.jwt
import input.attributes.request
import data.epapoc.data.errors

isAllowed {
    payload := jwt.get_token_payload(request)
    aacl_value := to_number(replace(payload.acr, "epa-poc-aal", ""))
    aacl_value >= 3
}

deny[errors.access_level_3_required] {
    not isAllowed
    payload := jwt.get_token_payload(request)
    aacl_value := to_number(replace(payload.acr, "epa-poc-aal", ""))
    not aacl_value >= 3
}

reasons := reasons {
    reasons := deny
}