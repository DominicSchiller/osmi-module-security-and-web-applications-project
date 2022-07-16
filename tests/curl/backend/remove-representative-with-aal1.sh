source ./get-token.sh

curl --location --request DELETE 'http://localhost:8686/api/patient/3326d733-31fb-4313-8070-68c705accbd5/representatives/45bf36f8-21d2-4c48-81c2-00ea462d30d5' \
--header "Authorization: $USER_JWT" | json_pp