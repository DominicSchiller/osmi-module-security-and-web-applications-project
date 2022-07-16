source ./get-token.sh

curl --location --request GET 'http://localhost:8686/api/patient/ed129ff3-5732-4d11-9ba6-39a53efd7386/insurance-details' \
--header "Authorization: $USER_JWT" | json_pp