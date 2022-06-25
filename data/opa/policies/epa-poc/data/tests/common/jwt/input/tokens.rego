package epapoc.data.tests.common.jwt.input_tokens

all_correct := {
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
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
            }
        }
    }
}

wrong_sub := {
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
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
            }
        }
    }
}

wrong_signature := {
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
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOgAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJwYXRpZW50Il19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlRlc3QgUGF0aWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QtcGF0aWVudCIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJQYXRpZW50IiwiZW1haWwiOiJ0ZXN0LXBhdGllbnRAZXBhLXBvYy5kZSJ9.LqKb1iE8b2mQg5nKVHZKfihAYg7SJXFEJd6LyOIAJkJW_Hck_4kCca8iB1O4y2TGwXyCLzGekStYhfI5d5weDvpzZ6UH7hHQDpDcMWPx4yBzzwDPmAyZBg5fnzs2DpV4ovujnJVsWqq1GZanbCMBMsfWm_tp3sEVhgjhXuKC-pVRm3uFhiMJSnVPL84tZwJPAKmkFomLawcQsiM7wIPdXILX_v8GO6rz8UlD89oxVgN7jVj7WBx7TGBMf8NlevoJFq6gDf2LRnp_SvrCMMc-h0stXaiHZ99zNXU57MyGqxaczNJBD5h0a9_rAdKUjRSVcAD9UcNc8Wjgfx9Iu6jPrA"
            }
        }
    }
}

multiple_errors := {
    "keycloak": {
        "user_info": {
            "sub": "d96abcea-3c16-4020-aa68-c07cddda3add",
            "email_verified": true,
            "name": "Test Patient",
            "preferred_username": "wrong-patient",
            "given_name": "Test",
            "family_name": "Patient",
            "email": "test-patient@epa-poc.de"
        }
    },
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpFYkRweXJ1ZnNvNElEZ2pkZ1N2dWNMUW96VEZzQVdtaXdnZVMtTzlMTFUifQ.eyJleHAiOjE2NTU1NjU5NTAsImlhdCI6MTY1NTU2NTY1MCwiYXV0aF90aW1lIjoxNjU1NTY1NjQ2LCJqdGkiOiIwNmE0YzViYy01NjY5LTQ4ODItOTQ5NS1hMDdhYTViZGIyZWYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDk2YWJjZWEtM2MxNi00MDIwLWFhNjgtYzA3Y2RkZGEzYWNjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI4NWU1NzlkMy0xMjgxLTQyNDUtYWE4Yi1iZWNmMTkyZjUzYzQiLCJhY3IiOiJlcGEtcG9jLWFhbDEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4Nzg3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiZXBhLXBvYy1mcm9udGVuZCI6eyJyb2xlcyI6WyJkb2N0b3IiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6Ijg1ZTU3OWQzLTEyODEtNDI0NS1hYThiLWJlY2YxOTJmNTNjNCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiVGVzdCBQYXRpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdC1wYXRpZW50IiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlBhdGllbnQiLCJlbWFpbCI6InRlc3QtcGF0aWVudEBlcGEtcG9jLmRlIn0.bEBGjuaCOYOBvw3YRPmBGoClDNfJjC9eNX29uB2XbAfXsBonn0za6CnWadTcnh5hJPHR20EBpcHn758zLGbWegl8zNUP3nFsFd2f4Nut10jaqXhsFDRR1_DELhrYAi9yVMwEZszX2aqBuN7M7e7C4S3ZZCUeWJc4wxWPL-9Z8255JF6RJvVKVWTkGSF-kvr4wnxoe-ZD8FUEWNe9uKyziIs3jazsY0Jrpoil04SRIyJkJdZLHU6q9lAsKpYblMgvfKT31v1Q_SwHRmWwcgA0gFuzrDkClswigIVCaVnHUHFEoJSw9_UDhBVt2MiDzSwkbPMJsPCzSpi1FIk3eVJOOA"
            }
        }
    }
}