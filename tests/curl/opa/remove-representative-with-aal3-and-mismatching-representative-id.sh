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
                    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKRWJEcHlydWZzbzRJRGdqZGdTdnVjTFFvelRGc0FXbWl3Z2VTLU85TExVIn0.eyJleHAiOjE2NTc4OTQyMTQsImlhdCI6MTY1Nzg5MzkxNCwiYXV0aF90aW1lIjoxNjU3ODkzOTE0LCJqdGkiOiI0OWFkMjgzYi02NWU1LTQzMTgtYTAzYy00YzQzZTA0YjQ2ZWUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODEvcmVhbG1zL2VwYS1wb2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMzMyNmQ3MzMtMzFmYi00MzEzLTgwNzAtNjhjNzA1YWNjYmQ1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZXBhLXBvYy1mcm9udGVuZCIsIm5vbmNlIjoiNWEwZDI1ZWUtNDMxZS00MTkwLWJiYTctNmRlYWZmNGYwYjkxIiwic2Vzc2lvbl9zdGF0ZSI6ImZmZmRlMmVmLTYzNzktNDk5My05MDQyLWEzMjVlZTZkM2Q0ZCIsImFjciI6ImVwYS1wb2MtYWFsMyIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgxODEvKiIsImh0dHA6Ly9sb2NhbGhvc3Q6ODc4NyIsImh0dHA6Ly9sb2NhbGhvc3Q6ODc4Ny8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWVwYS1wb2MiLCJwYXRpZW50Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJmZmZkZTJlZi02Mzc5LTQ5OTMtOTA0Mi1hMzI1ZWU2ZDNkNGQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJGcmFuemlza2EgRnJleXRhZyIsInByZWZlcnJlZF91c2VybmFtZSI6ImZmcmV5dGFnIiwiZ2l2ZW5fbmFtZSI6IkZyYW56aXNrYSIsImZhbWlseV9uYW1lIjoiRnJleXRhZyIsImVtYWlsIjoiZnJhbnppc2thLmZyZXl0YWdAZXBhLXBvYy5kZSJ9.aQvWJwm55oIsppzC4El_q6rOzY9tlOKP5TX3E0CQUefqMIZgjWy7OuKgvF7G-zQF62Y9_z-9nw37dKEGgDAaW-r-mY-RaR8ljxeZGQ1x4GC-kwDMdvfop3OWWbuS1mvEA81dMk6zZNRWNstj8yUFEHvZzMAZSoXZD2hHiKtvnFm5VFEMxAfNeSSmSqXui3sH8NPqy3Abg6RO77c-BSnO71Q0Dd7oAl8GgBOdWCTiUg8lM7evZhuFNpVBwBa4NxUciU9g1m9s56kppQ2YBv4NOT2QE66qIEDDDqSEpKpVG16Lkm8v2vSgwg8lZW_VKLxZ19xeUcnPcn9qzZYC2YXyFQ"
                },
                "params": {
                    "patientId": "3326d733-31fb-4313-8070-68c705accbd5",
                    "representativeId": "24464036-38bc-48ec-bce0-b4aa6e43a5de"
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