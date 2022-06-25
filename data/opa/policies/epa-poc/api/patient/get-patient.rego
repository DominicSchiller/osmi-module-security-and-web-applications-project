package epapoc.patient.getpatient

import data.epapoc.common.jwt
import input.attributes.request.http

default isAllowed := false

# allow is true if ALL of the body statements are true
isAllowed := isAllowed {
  isAllowed := jwt.isAllowed
}

reasons :=  jwtReasons {
  not isAllowed
  jwtReasons := jwt.reasons
}