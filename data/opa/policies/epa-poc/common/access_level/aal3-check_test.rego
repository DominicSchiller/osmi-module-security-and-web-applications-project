package epapoc.common.aal.aal3.tests

import data.epapoc.common.aal.aal3
import data.epapoc.data.tests.common.jwt.input_tokens
import data.epapoc.data.errors
import data.epapoc.utils

test_deny_with_aal1 {
    not aal3.isAllowed with input as input_tokens.aal_1
    reasons := aal3.reasons with input as input_tokens.aal_1
    utils.contains(reasons, errors.access_level_3_required)
}
