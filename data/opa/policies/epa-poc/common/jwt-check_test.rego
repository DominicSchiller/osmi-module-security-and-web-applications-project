package epapoc.common.jwt

import data.epapoc.data.errors

test_allow_with_correct_input {
    result := token_verification with input as {
        "keycloak": {
            "user_info": {
                "sub": "d96abcea-3c16-4020-aa68-c07cddda3acc",
                "email_verified": true,
                "name": "Test Patient",
                "preferred_username": "test-patient",
                "given_name": "Test",
                "family_name": "Patient",
                "email": "test-patient@epa-poc.de"
            }
        },
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
    }
    result.isAllowed
    not result.reasons
}

test_deny_token_with_wrong_preferred_username {
    result := token_verification with input as {
        "keycloak": {
            "user_info": {
                "sub": "d96abcea-3c16-4020-aa68-c07cddda3acc",
                "email_verified": true,
                "name": "Test Patient",
                "preferred_username": "wrong-patient",
                "given_name": "Test",
                "family_name": "Patient",
                "email": "test-patient@epa-poc.de"
            }
        },
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
    }
    not result.isAllowed
    count(result.reasons) == 1
}

test_deny_token_with_wrong_sub {
    result := token_verification with input as {
        "keycloak": {
            "user_info": {
                "sub": "d96abcea-3c16-4020-aa68-c07cddda3abc",
                "email_verified": true,
                "name": "Test Patient",
                "preferred_username": "test-patient",
                "given_name": "Test",
                "family_name": "Patient",
                "email": "test-patient@epa-poc.de"
            }
        },
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
    }
    not result.isAllowed
    count(result.reasons) == 1
}

test_deny_with_wrong_access_token_signature {
    result := token_verification with input as {
        "keycloak": {
            "user_info": {
                "sub": "d96abcea-3c16-4020-aa68-c07cddda3acc",
                "email_verified": true,
                "name": "Test Patient",
                "preferred_username": "test-patient",
                "given_name": "Test",
                "family_name": "Patient",
                "email": "test-patient@epa-poc.de"
            }
        },
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOgAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
    }
    not result.isAllowed
    count(result.reasons) == 1
}

test_deny_with_multiple_corrupted_token_data {
    result := token_verification with input as {
        "keycloak": {
            "user_info": {
                "sub": "d96abcea-3c16-4020-aa68-c07cddda3ade",
                "email_verified": true,
                "name": "Test Patient",
                "preferred_username": "wrong-patient",
                "given_name": "Test",
                "family_name": "Patient",
                "email": "test-patient@epa-poc.de"
            }
        },
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
    }
    not result.isAllowed
    count(result.reasons) == 2
}