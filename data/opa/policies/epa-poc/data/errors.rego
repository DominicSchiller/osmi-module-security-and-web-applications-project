package epapoc.data.errors

ok := {
    "status": 0,
    "message": "All checks passed"
}

# JWT related errors

bad_access_token_signature := {
    "status": 1,
    "message": "The access token provided has a bad signature"
}

bad_access_token_sub := {
    "status": 1,
    "message": "The access token provided does not belong to user"
}

# Access Level related errors
access_level_2_required := {
    "status": 2,
    "message": "A minimum access level of 2 is required"
}

access_level_3_required := {
    "status": 3,
    "message": "A minimum access level of 3 is required"
}

# Patient related errors

bad_access_patientId_missing := {
    "status": 1,
    "message": "The request has no patientId param"
}

bad_access_patientId_mismatch := {
    "status": 1,
    "message": "The request contains a mismatching patientId param"
}

bad_access_no_patient_data := {
    "status": 1,
    "message": "The patient odes not exist"
}

bad_access_no_representative_of_patient := {
     "status": 1,
    "message": "No representative of given patient"
}

# Representative related errors

bad_access_no_representative_data := {
    "status": 1,
    "message": "The representative does not exist"
}

bad_access_no_patient_of_representative := {
     "status": 1,
    "message": "No patient of given representative"
}