package epapoc.common.aal.aal2.tests

import data.epapoc.common.aal.aal2
import data.epapoc.data.tests.common.jwt.input_tokens
import data.epapoc.data.errors
import data.epapoc.utils

test_deny_with_aal1 {
    not aal2.isAllowed with input as input_tokens.aal_1
    reasons := aal2.reasons with input as input_tokens.aal_1
    utils.contains(reasons, errors.access_level_2_required)
}

test_allow_with_aal2 {
    aal2.isAllowed with input as input_tokens.aal_2
    reasons := aal2.reasons with input as input_tokens.aal_2
    reasons == set()
}