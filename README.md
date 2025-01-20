# TASK FORCE PRO 2.0
## Wallet Web Application

# TASK FORCE PRO 2.0
## Wallet Web Application

<img width="959" alt="image" src="https://github.com/user-attachments/assets/ca0e7580-6959-4f65-ab57-25cd7e6bf287" />

## Project Description and Expectations

`This Project has Two Parts, frontend and backend, on Frontend i used next js, tailwindcss and Ant-Design`
`on Backend i used Node js, Express,Sequelize, and postgreSQL database `

`You will be able manage transactions, set budget limit`

`Get message when transactions (Expenses) are exceeding budget Limit`

`Creating categories and sub categories`
`Account management, you can create more accounts as you like and select which one to use on transaction.`

## Deployment


### [Frontend is deployed on vercel](https://task-force-pro-2-0-fe.vercel.app/),
### [Backend is deployed on rencder.com](https://task-force-pro-2-0-be.onrender.com)

### [Backend Repo Link](https://github.com/Jeanndo/task-force-pro-2.0-be)


# PROJECT SET

 ## Frontend


  Create a on your pc, open it in your favorite editor, I am using [VS CODE](https://code.visualstudio.com/)

  Then clone frontend respository with this command

  `git clone https://github.com/Jeanndo/task-force-pro-2.0-fe.git`

  Enter inside the project by runing this command

  `cd task-force-pro-2.0-fe`

  Install Dependances by running this command

  `npm install or npm install --legacy-peer-deps` if npm registry can't resolve some dependences

  Start the project by running this command

  `npm run dev`

  ## Backend

  Tools to install

  [postgreSQL Database](https://www.postgresql.org/download/)
  [Pg Admin if you want to manually check your database using GUI](https://www.pgadmin.org/)
  [Postman for testing API(s)](https://www.postman.com/downloads/)
  [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

  The rest will be installed with project dependences.

  First clone the repo by running this command

  `git clone https://github.com/Jeanndo/task-force-pro-2.0-be.git`

  Enter the project folder by running

  `cd task-force-pro-2.0-be`
  Install Dependences by running this command

  `npm install or npm install --legacy-peer-deps` if npm registry can't resolve some dependences

   Create `.env` file and define your environment variables like so

   ```
PORT = your port
DATABASE_NAME = your database name
DATABASE_USER_NAME = postgresql or your favorite one
DATABASE_PASSWORD =  your database password
DATABSE_PORT = your database port or 5432 for postgresql
DATABASE_HOST = your database host

JWT_SECRETE = your jwt secrete
JWT_EXPIRES_IN = your jwt expiration time frame
NODE_ENV = environment: development or production
DIALET = postgresql or any of your favorite
PASSWORD_HASH_SALT = YOUR HASHING SALT
   ```

Starting the Project

`npm run start:dev`
`npm run create` To create a database
`npm run migrate ` to migrate all migrations into the database

With all command above you are all set 🚀

your can find other scripts under script section of the `package json` file


SCREEN SHOOTS
This is a dashboard for transaction analysis

<img width="959" alt="image" src="https://github.com/user-attachments/assets/3816878c-f184-4227-96ad-1c4639fdbb77" />
<img width="959" alt="image" src="https://github.com/user-attachments/assets/02f1b2c6-1384-4a42-9833-cabdef34078b" />


