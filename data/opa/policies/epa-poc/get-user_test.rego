package epapoc.getuser.test

import data.epapoc.getuser.allow

test_allow_is_false_by_default {
    not allow 
}

test_allow_user_jennifer_schraeder {
    allow with input as {
        "firstName": "Jennifer",
        "lastName": "Schräder"
    }
}

test_deny_unknown_user {
    not allow with input as {
        "firstName": "Jennifer",
        "lastName": "Schröder"
    }
}