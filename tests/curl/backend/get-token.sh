while [[ "$#" -gt 0 ]]; do
    case $1 in
        -otp|--otp) otp="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

function parse_json()
{
    echo $1 | \
    sed -e 's/[{}]/''/g' | \
    sed -e 's/", "/'\",\"'/g' | \
    sed -e 's/" ,"/'\",\"'/g' | \
    sed -e 's/" , "/'\",\"'/g' | \
    sed -e 's/","/'\"---SEPERATOR---\"'/g' | \
    awk -F=':' -v RS='---SEPERATOR---' "\$1~/\"$2\"/ {print}" | \
    sed -e "s/\"$2\"://" | \
    tr -d "\n\t" | \
    sed -e 's/\\"/"/g' | \
    sed -e 's/\\\\/\\/g' | \
    sed -e 's/^[ \t]*//g' | \
    sed -e 's/^"//'  -e 's/"$//'
}

result=$(curl --location --request POST 'http://localhost:8181/realms/epa-poc/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=epa-poc-frontend' \
--data-urlencode 'scope=openid' \
--data-urlencode 'username=ffreytag' \
--data-urlencode 'password=test1234' \
--data-urlencode "totp=$otp" | json_pp)

token=$(parse_json "$result" 'access_token')
token="Bearer ${token//'access_token" : "'/}"

export USER_JWT="$token"
# echo $token