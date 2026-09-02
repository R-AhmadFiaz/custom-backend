i am starting my journey for learning node backend

i used mongoDB atlas to connect database to my backend,
 my totally focus this time is on professional setup instead of direct rush toward code 
 to understand production grade setup that will help me understand and debug professional codes 
 and encourage contributions on github


i connect mongoDB to my small expressJS backend and used error handeling to avoid it to crash
meanwhile organize every file separately and make index.ts main file and import all file functionalities there to keep the project clear to debug and understand


i used npm packages named cookie-parser and cors and import it in app.ts to configure them with understanding about CORS concept 


i created wrapper functions for express routing so i would not need to write callback functions again and again for routing.

to make the error response standard i used Error class and create my custome class and make standard reponse when ever error come.


i created the data model of user and video table because they are very related to each other i also used jwt and bcrypt library in user model to hash the password and created access and refresh tokens and sign the signature to them its not in consition to work and thats absolute because this time i am only learning the concepts and coding is not start yet my whole concentratrion is mostly in understanding the depth i have not reached coding its been 1 week i am still working on liberaries data modeling setup tyepscript and debugging


i debug my previous code on user.model.ts because i am using typescript for my project which create new challenges and its important to look at them and solve.meanwhile i created file upload utility using cloudinary and make code as efficient as possible using try catch and async await

i created first middleware using multer in separate file name multer.middleware.ts

Today I worked on the user registration flow by creating the registration controller and route, connecting the async handler middleware, adding Multer for avatar and cover image uploads, and integrating Cloudinary to upload images and save their URLs with the user data in MongoDB. I also practiced handling req.body, req.files, TypeScript types, optional values, and async/await.

i have made the login user controller and used the efficient and safe approach to avoid code crash  and generate response by creating another class of apiResponse that will be standard for my response while preventing password and refresh token in respnse 

i build logout controller for user by accessing its access token and verify it by signature of jwt and then remove refresh token and log out the user