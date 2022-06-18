package epapoc.common.jwt
import data.epapoc.data.certs

is_jwt_token_valid {
    io.jwt.verify_rs256(input.access_token, certs.rs256_cert)
    [_, payload, _] := io.jwt.decode(input.access_token) # token payload
    user_info := input.keycloak.user_info
    payload.name == user_info.name
    payload.sub == user_info.sub
    payload.preferred_username == user_info.preferred_username
}