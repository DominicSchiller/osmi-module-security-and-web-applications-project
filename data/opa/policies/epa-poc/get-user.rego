package epapoc.getuser

default allow := false

# allow is true if ALL of the body statements are true
allow {
   [_, payload, _] := io.jwt.decode(input.access_token) # token payload
   user_info := input.keycloak.user_info
   payload.name == user_info.name
   payload.sub == user_info.sub
   payload.preferred_username == user_info.preferred_username
}