# Mimir: A Password Manager

This project has only been tested on Windows machines.

The backend needs a .env file to be created and placed in
the src folder, an example file is provided called ".env_example".

HTTPS certificate and key are provided in the Assets folder,
an absolute path to these files must be included in the backend
.env file under KEY_PATH and CERT_PATH, respectfully.

The AUTH_SECRET variable is used to encrypt JWT tokens, it can be
anything.

The ENCRYPT_KEY variable should be "SECRET"
if you want to use the database provided with this project.

MongoDB version 4.4.6 and NodeJS version 16.4 must be installed.
Node can be downloaded from this address: https://nodejs.org/en/
MongoDB can be downloaded from this address: https://www.mongodb.com/try/download/community

The backend can be run by navigating to the
"/password-manager/password-manager/" folder, opening a console and
entering "npm run start". Make sure dependencies are installed by
running "npm install" first.

The frontend can be run by navigating to the
"/password-manager/password-manager-client" folder, opening a console and
entering "npm run start". Make sure dependencies are installed by
running "npm install" first.

A populated MongoDB database file has been included in the Assets
folder. An absolute path to the MongoDB database must be included
in the .env file under DATABASE_ADDRESS. The default address is
"mongodb://127.0.0.1:27017/example-database".

The included database file contains 3 example users, each of which
have 5 password records. The log in details for each example user
are listed below.

Username Password

ExampleUser1 ExamplePassword

ASecondExampleuser ThisIsAnExamplePassword!

TheFinalExample Secure_Password9
