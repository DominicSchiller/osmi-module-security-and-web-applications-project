curl --location --request POST 'http://localhost:8282/v1/data/epapoc/patient/remove_representative' \
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
                    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTYyNDM0MDcsImlhdCI6MTY1NjI0MzEwNywiYXV0aF90aW1lIjoxNjU2MjQzMTA2LCJqdGkiOiJmZjA4ZWRhNy04MjAxLTQxYmYtOTQ1YS02MmUzYWIyYWViOWQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJzdWIiOiIzMzI2ZDczMy0zMWZiLTQzMTMtODA3MC02OGM3MDVhY2NiZDUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJlcGEtcG9jLWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjY5MDZiODJiLTRlMjctNDMzNi05YmIwLTI4YjEwY2M3ZTIyMyIsImFjciI6ImVwYS1wb2MtYWFsMiIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0Ojg3ODciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInBhdGllbnQiXX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI2OTA2YjgyYi00ZTI3LTQzMzYtOWJiMC0yOGIxMGNjN2UyMjMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJGcmFuemlza2EgRnJleXRhZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImZmcmV5dGFnIiwiZ2l2ZW5fbmFtZSI6IkZyYW56aXNrYSIsImZhbWlseV9uYW1lIjoiRnJleXRhZyIsImVtYWlsIjoiZnJhbnppc2thLmZyZXl0YWdAZXBhLXBvYy5kZSJ9.MI6w-7J3VAFfcQKuxewBeY6_NabgHwrLE9tn1wDgMZOKXdNGdTSrLEGL6lY-mr6qQ7LLoUr8aThG4EGdUzXdeKCsfZspDCJGjFuAWMaBisCXi8Yt0yfLzRUiva_EVXROqGHUNx4Vodp55k6ik8Sb1LgVtaLIX1hEiqaXwHi1dA3VFl6FVOoaialioX_1pEGLtRSCPfQGk0VHgxQm-XC_E02VmdjeC_YTnKk0djlYWN7YrjGkFTIXwhKnU7C5gEplgq_k5k0pYQOeyZWUKCY_KvxTJjTP7RbwIAk5tvJV--n4AetPEQzadP2Hd_co6fFsdiGZ4nbmqYUH0susn4Byng"
                },
                "params": {
                    "patientId": "3326d733-31fb-4313-8070-68c705accbd5",
                    "representativeId": "45bf36f8-21d2-4c48-81c2-00ea462d30d5"
                }
            }
        },
        "fetchedData": {
            "patient": {
                "_id": "3326d733-31fb-4313-8070-68c705accbd5",
                "representatives": ["45bf36f8-21d2-4c48-81c2-00ea462d30d5"]
            },
            "representative": {
                "_id": "45bf36f8-21d2-4c48-81c2-00ea462d30d5"
            }
        }
    }
}' | json_pp