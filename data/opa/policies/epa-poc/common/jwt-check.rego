package epapoc.common.jwt

import data.epapoc.data.certs
import data.epapoc.data.errors

# verifies the access token's signature against keycloak certificate
deny[errors.bad_access_token_signature] { 
    not io.jwt.verify_rs256(input.access_token, certs.rs256_cert)
}

# verifies access token's payload sub value against fetched keyacloak user info's sub value
deny[errors.bad_access_token_sub] { 
    [_, payload, _] = io.jwt.decode(input.access_token) # token payload
    user_info := input.keycloak.user_info
    not payload.sub == user_info.sub
}

# verifies access token's payload name value against fetched keyacloak user info's preferred_username value
deny[errors.bad_access_token_username] { 
    [_, payload, _] = io.jwt.decode(input.access_token) # token payload
    user_info := input.keycloak.user_info

    not payload.preferred_username == user_info.preferred_username
}
default token_verification := {
    "isAllowed": false
}

token_verification = {"isAllowed": true} {
    deny == set()
}

token_verification = {"isAllowed": false, "reasons": reasons} {
    reasons := deny
    deny != set()
}
