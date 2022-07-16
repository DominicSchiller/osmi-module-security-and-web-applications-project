source ./get-token.sh

curl --location --request GET 'http://localhost:8686/api/patient/3326d733-31fb-4313-8070-68c705accbd5/records' \
--header "Authorization: $USER_JWT" | json_pp