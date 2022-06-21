package epapoc.common.jwt

import input.attributes.request
import data.epapoc.data.certs
import data.epapoc.data.errors

# verifies the access token's signature against keycloak certificate
deny[errors.bad_access_token_signature] {
     [_, encoded_token] := split(request.headers.authorization, " ")
    not io.jwt.verify_rs256(encoded_token, certs.rs256_cert)
}

# verifies access token's payload sub value against fetched keyacloak user info's sub value
deny[errors.bad_access_token_sub] { 
    payload := get_token_payload(request)
    user_info := input.keycloak.user_info
    not payload.sub == user_info.sub
}

# verifies access token's payload name value against fetched keyacloak user info's preferred_username value
deny[errors.bad_access_token_username] { 
    payload := get_token_payload(request)
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

get_token_payload(request) := result {
    [_, encoded_token] := split(request.headers.authorization, " ")
    [_, payload, _] = io.jwt.decode(encoded_token)
    result := payload
}