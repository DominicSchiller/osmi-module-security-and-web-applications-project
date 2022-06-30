package epapoc.patient.remove_representative.tests

import data.epapoc.patient.remove_representative
import data.epapoc.data.tests.patient.input_requests
import data.epapoc.data.errors
import data.epapoc.utils

test_deny_with_aal1 {
    not remove_representative.isAllowed with input as input_requests.all_correct_aal1
    reasons := remove_representative.reasons with input as input_requests.all_correct_aal1
    utils.contains(reasons, errors.access_level_3_required)
}

test_deny_with_aal1_and_bad_token_signature {
    not remove_representative.isAllowed with input as input_requests.bad_token_signature_aal1
    reasons := remove_representative.reasons with input as input_requests.bad_token_signature_aal1
    utils.contains(reasons, errors.access_level_3_required)
    utils.contains(reasons, errors.bad_access_token_signature)
}

test_deny_with_aal2 {
    not remove_representative.isAllowed with input as input_requests.all_correct_aal2
    reasons := remove_representative.reasons with input as input_requests.all_correct_aal2
    utils.contains(reasons, errors.access_level_3_required)
}

test_deny_with_aal2_and_bad_token_signature {
    not remove_representative.isAllowed with input as input_requests.bad_token_signature_aal2
    reasons := remove_representative.reasons with input as input_requests.bad_token_signature_aal2
    utils.contains(reasons, errors.access_level_3_required)
    utils.contains(reasons, errors.bad_access_token_signature)
}

test_allow_with_aal3 {
    remove_representative.isAllowed with input as input_requests.all_correct_aal3
}

test_deny_with_aal3_and_bad_token_signature {
    not remove_representative.isAllowed with input as input_requests.bad_token_signature_aal3
    reasons := remove_representative.reasons with input as input_requests.bad_token_signature_aal3
    not utils.contains(reasons, errors.access_level_3_required)
    utils.contains(reasons, errors.bad_access_token_signature)
}