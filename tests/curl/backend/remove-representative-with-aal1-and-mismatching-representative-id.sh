source ./get-token.sh

curl --location --request DELETE 'http://localhost:8686/api/patient/3326d733-31fb-4313-8070-68c705accbd5/representatives/24464036-38bc-48ec-bce0-b4aa6e43a5de' \
--header "Authorization: $USER_JWT" | json_pp