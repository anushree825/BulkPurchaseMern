Bulk Purchase App using MERN stack

An app for vendors to host and dispatch their products according to the vendor defined minimum bulk dispatch quantity and customers to order a required quantity from the listed products.

Setup
Node

For Linux:
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs

For Mac:
brew install node

MongoDB

React
npm install -g create-react-app

To create a new React app:
create-react-app name_of_app

To run the app, cd into the directory and do:
npm start

Running the code

Run Mongo daemon:
sudo mongod
Mongo will be running on port 27017.

To create a database:

mongo
This will open the mongo shell. Type in use users to create a new database called users.

Run Express:

cd backend/
npm install
npm start

Run React:

cd frontend
npm install/
npm start

Navigate to localhost:3000/ in your browser.
