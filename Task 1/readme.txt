/*Node Version 14*/
/*Run xampp server before run these command*/

/*Run these command to configure this project */
npm install
npx sequelize-cli db:create
npx sequelize-cli model:generate --name Germanphonenumber --attributes phone:string,taskId:string
npx sequelize-cli db:migrate
npm start


/*End Points*/

/*Post*/
localhost:3000/api/phonenumber/upload

/*Get*/
localhost:3000/api/phonenumber/

/*Get*/
localhost:3000/api/phonenumber/{taskId}

/*Delete*/
localhost:3000/api/phonenumber/{taskId}