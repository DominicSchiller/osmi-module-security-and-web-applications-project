package epapoc.patient.get_insurance_details.tests

import data.epapoc.patient.get_insurance_details
import data.epapoc.data.tests.patient.input_requests
import data.epapoc.data.errors
import data.epapoc.utils

test_deny_with_aal1 {
    not get_insurance_details.isAllowed with input as input_requests.all_correct_aal1
    reasons := get_insurance_details.reasons with input as input_requests.all_correct_aal1
    utils.contains(reasons, errors.access_level_2_required)
}

test_deny_with_aal1_and_bad_token_signature {
    not get_insurance_details.isAllowed with input as input_requests.bad_token_signature_aal1
    reasons := get_insurance_details.reasons with input as input_requests.bad_token_signature_aal1
    utils.contains(reasons, errors.access_level_2_required)
    utils.contains(reasons, errors.bad_access_token_signature)
}

test_allow_with_aal2 {
    get_insurance_details.isAllowed with input as input_requests.all_correct_aal2
}

test_deny_with_aal2_and_bad_token_signature {
    not get_insurance_details.isAllowed with input as input_requests.bad_token_signature_aal2
    reasons := get_insurance_details.reasons with input as input_requests.bad_token_signature_aal2
    not utils.contains(reasons, errors.access_level_2_required)
    utils.contains(reasons, errors.bad_access_token_signature)
}