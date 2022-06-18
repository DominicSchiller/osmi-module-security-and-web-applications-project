package epapoc.getuser
import data.epapoc.common.jwt

default allow := false

# allow is true if ALL of the body statements are true
allow {
  jwt.is_jwt_token_valid
}