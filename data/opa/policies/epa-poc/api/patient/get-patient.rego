package epapoc.patient.getpatient

import data.epapoc.common.jwt
import input.attributes.request.http

default authorization := {
    "isAllowed": false
}

# allow is true if ALL of the body statements are true
authorization = authorization {
  authorization := jwt.token_verification
}