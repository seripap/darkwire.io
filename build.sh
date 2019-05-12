echo "building client..."
rm -rf client
git clone https://github.com/darkwire/darkwire-client.git client
cd client
yarn
REACT_APP_API_HOST=$API_HOST \
REACT_APP_API_PROTOCOL=$API_PROTOCOL \
REACT_APP_API_PORT=$API_PORT \
yarn react-scripts build
cd ../

echo "building server..."
rm -rf server
git clone https://github.com/darkwire/darkwire-server.git server
cd server
yarn
yarn build
rm -rf build
rm -rf dist
npx babel src -d dist/src --copy-files