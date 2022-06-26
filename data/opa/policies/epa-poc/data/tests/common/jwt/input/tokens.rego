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

aal_1 := {
    "keycloak": {
        "user_info": {
            "sub": "3326d733-31fb-4313-8070-68c705accbd5",
            "email_verified": true,
            "name": "Franziska Freytag",
            "preferred_username": "ffreytag",
            "given_name": "Franziska",
            "family_name": "Freytag",
            "email": "franziska.freytag@epa-poc.de"
        }
    },
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTYyMzY2MTYsImlhdCI6MTY1NjIzNjMxNiwiYXV0aF90aW1lIjoxNjU2MjM0MTIwLCJqdGkiOiI0YzYyM2UyMC1kZTY4LTQ1ZmQtOGZkYy04ZTlkMTQxZTI3NjkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJzdWIiOiIzMzI2ZDczMy0zMWZiLTQzMTMtODA3MC02OGM3MDVhY2NiZDUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlcGEtcG9jLWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjI2ZTA1YjI4LTFlNTktNDkyZS05OTk4LWYzNDIwNTZkMjg2ZiIsImFjciI6ImVwYS1wb2MtYWFsMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0Ojg3ODciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInBhdGllbnQiXX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjI2ZTA1YjI4LTFlNTktNDkyZS05OTk4LWYzNDIwNTZkMjg2ZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkZyYW56aXNrYSBGcmV5dGFnIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZmZyZXl0YWciLCJnaXZlbl9uYW1lIjoiRnJhbnppc2thIiwiZmFtaWx5X25hbWUiOiJGcmV5dGFnIiwiZW1haWwiOiJmcmFuemlza2EuZnJleXRhZ0BlcGEtcG9jLmRlIn0.crcHySyZwaY3o_Tf2IgkPIA_QD8df3lC4L_rJb1F_gH_VzVcA4iqw75TKiYls1OdK3UGcU8blQM5F1iKCB5043BWOc4iP99ttFe60MswgFXnMqTp4wAJnP1tcr6B5sEviNAwtSEVmH_VlYJHiyWV1T8y1yXUNHPFjOPbub_zBbcubccdhRDvXjJfPD_l0vFLyhfvvXoqKWmoQP32AwZvXhM5CwnrZg-ZZnxqXvfkpOFz2fpnxuAsrtBqV0jOJ3HPlgIAbVkR5ov3of3yNXr6Y6bYP03nCGoteH7pTEa2tK3jnl_YCH6Fq56V1QOe5bsBoigg0iXQ4FvIyGSF-oTDRA"
            }
        }
    }
}

aal_2 := {
    "keycloak": {
        "user_info": {
            "sub": "3326d733-31fb-4313-8070-68c705accbd5",
            "email_verified": true,
            "name": "Franziska Freytag",
            "preferred_username": "ffreytag",
            "given_name": "Franziska",
            "family_name": "Freytag",
            "email": "franziska.freytag@epa-poc.de"
        }
    },
    "attributes": {
        "request": {
            "headers": {
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTYyNDM0MDcsImlhdCI6MTY1NjI0MzEwNywiYXV0aF90aW1lIjoxNjU2MjQzMTA2LCJqdGkiOiJmZjA4ZWRhNy04MjAxLTQxYmYtOTQ1YS02MmUzYWIyYWViOWQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJzdWIiOiIzMzI2ZDczMy0zMWZiLTQzMTMtODA3MC02OGM3MDVhY2NiZDUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlcGEtcG9jLWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjY5MDZiODJiLTRlMjctNDMzNi05YmIwLTI4YjEwY2M3ZTIyMyIsImFjciI6ImVwYS1wb2MtYWFsMiIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0Ojg3ODciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInBhdGllbnQiXX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI2OTA2YjgyYi00ZTI3LTQzMzYtOWJiMC0yOGIxMGNjN2UyMjMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJGcmFuemlza2EgRnJleXRhZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImZmcmV5dGFnIiwiZ2l2ZW5fbmFtZSI6IkZyYW56aXNrYSIsImZhbWlseV9uYW1lIjoiRnJleXRhZyIsImVtYWlsIjoiZnJhbnppc2thLmZyZXl0YWdAZXBhLXBvYy5kZSJ9.MI6w-7J3VAFfcQKuxewBeY6_NabgHwrLE9tn1wDgMZOKXdNGdTSrLEGL6lY-mr6qQ7LLoUr8aThG4EGdUzXdeKCsfZspDCJGjFuAWMaBisCXi8Yt0yfLzRUiva_EVXROqGHUNx4Vodp55k6ik8Sb1LgVtaLIX1hEiqaXwHi1dA3VFl6FVOoaialioX_1pEGLtRSCPfQGk0VHgxQm-XC_E02VmdjeC_YTnKk0djlYWN7YrjGkFTIXwhKnU7C5gEplgq_k5k0pYQOeyZWUKCY_KvxTJjTP7RbwIAk5tvJV--n4AetPEQzadP2Hd_co6fFsdiGZ4nbmqYUH0susn4Byng"
            },
            "params": {
                "patientId": "3326d733-31fb-4313-8070-68c705accbd5"
            }
        }
    }
}

