package epapoc.getuser

import data.epapoc.common.jwt

default authorization := {
    "isAllowed": false
}

# allow is true if ALL of the body statements are true
authorization = authorization {
  authorization := jwt.token_verification
}