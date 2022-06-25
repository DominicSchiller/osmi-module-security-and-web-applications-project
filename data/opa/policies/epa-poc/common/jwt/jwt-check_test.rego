package epapoc.common.jwt.tests

import data.epapoc.data.tests.common.jwt.input_tokens
import data.epapoc.common.jwt.isAllowed
import data.epapoc.common.jwt.reasons
import data.epapoc.data.errors
import data.epapoc.utils

test_allow_with_correct_input {
    result_isAllowed := isAllowed with input as input_tokens.all_correct
    result_isAllowed
}

test_deny_token_with_wrong_sub {
    result_isAllowed := isAllowed with input as input_tokens.wrong_sub
    result_reasons := reasons with input as input_tokens.wrong_sub
    not result_isAllowed
    utils.contains(result_reasons, errors.bad_access_token_sub)
}

test_deny_with_wrong_access_token_signature {
    result_isAllowed := isAllowed with input as input_tokens.wrong_signature
    result_reasons := reasons with input as input_tokens.wrong_signature
    not result_isAllowed
    utils.contains(result_reasons, errors.bad_access_token_signature)
}

test_deny_with_multiple_corrupted_token_data {
    result_isAllowed := isAllowed with input as input_tokens.multiple_errors
    result_reasons := reasons with input as input_tokens.multiple_errors
    not result_isAllowed
    count(result_reasons) == 2
    utils.contains(result_reasons, errors.bad_access_token_signature)
    utils.contains(result_reasons, errors.bad_access_token_signature)
}