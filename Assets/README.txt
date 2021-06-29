This project has only been tested on Windows machines.

The backend needs a .env file to be created and placed in
the src folder, an example file is given.

HTTPS certificate and key are provided in the asset folder,
an absolute path to these files must be included in the backend
.env file under KEY_PATH and CERT_PATH, respectfully.

The ENCRYPT_KEY variable should use the same value as the example
.env file.

The backend can be run by navigating to the
/password-manager/password-manager/ folder, opening a console and
entering "npm run start".

The frontend can be run by navigating to the
/password-manager/password-manager-client folder, opening a console and
entering "npm run start".

MongoDB and NodeJS must be installed.

A populated MongoDB database file has been included in the Assets
folder. An absolute path to the MongoDB database must be included
in the .env file under DATABASE_ADDRESS.

The included database file contains 3 example users, each of which
have 5 password records. The log in details for each example user
are listed below.

Username		Password

ExampleUser1		ExamplePassword1234

ASecondExampleUser	ThisIsAnExamplePassword!

TheFinalExample		Secure_Password9

