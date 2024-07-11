
# $1 is the IP address of the server

# check if the IP address is provided
if [ -z "$1" ]
then
    echo "パブリックIPアドレスを入力してください"
    echo "Usage: npm start <IP address>"
    exit 1
fi

# Start the server
SERVER_IP=$1 node ./bin/www