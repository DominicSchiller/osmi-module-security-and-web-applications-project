curl --location --request POST 'http://localhost:8282/v1/data/epapoc/patient/get_patient' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": {
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
                },
                "params": {
                }
            }
        }
    }
}' | json_pp