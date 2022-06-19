package epapoc.data.errors

ok := {
    "status": 0,
    "message": "All checks passed"
}

bad_access_token_signature := {
    "status": 1,
    "message": "The access token provided has a bad signature"
}

bad_access_token_sub := {
    "status": 1,
    "message": "The sub id of the access token provided is wrong"
}

bad_access_token_username := {
    "status": 1,
    "message": "The access token provided does not belong to user"
}

access_level_2_required := {
    "status": 1,
    "message": "A minimum access level of 2 is required"
}
