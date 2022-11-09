#! /bin/bash

# Exit immediately if a simple command exits with a nonzero exit value
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
WEBSERVICE_DIR=rookies-5-team-2-be
WEBUI_DIR=rookies-5-team-2-fe
HOST_IP=18.143.78.133
PEM_FILE=rookies2022_java_group_2.pem

sed -i "s|http://localhost:8080|http://$HOST_IP:8080|" $WEBUI_DIR/src/constants/index.js
sed -i "18s|spring.sql.init.mode=always|spring.sql.init.mode=never|" $WEBSERVICE_DIR/src/main/resources/application.properties

cd $WEBSERVICE_DIR
mvn clean install -DskipTests
cd $SCRIPT_DIR

cd $WEBUI_DIR
npm install && npm run build
cd $SCRIPT_DIR

scp -i $PEM_FILE $WEBSERVICE_DIR/target/post-0.0.1-SNAPSHOT.jar ubuntu@$HOST_IP:/home/ubuntu/$WEBSERVICE_DIR/assets.jar
scp -i $PEM_FILE -r $WEBUI_DIR/build/* ubuntu@$HOST_IP:/home/ubuntu/$WEBUI_DIR

ssh -i $PEM_FILE ubuntu@$HOST_IP '/home/ubuntu/restart.sh'
