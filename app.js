'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
//const db = require('./db');
//const User = require('./db/models/User');
//const Course = require('./db/models/Course');

const { sequelize, models, db } = require('./db');

// Get references to our models.
const { User, Course } = models;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

app.use(express.json())

// Construct a router instance.
// const router = express.Router();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

/* Handler function to wrap each route. */
// function asyncHandler(cb){
//   return async(req, res, next) => {
//     try {
//       await cb(req, res, next)
//     } catch(error){
//       res.status(500).send(error);
//       console.log('this error comes from the async handler')
//     }
//   }
// }

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', async (req, res) => {
  await db.sequelize.sync({ force: true });
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//USER ROUTES

//post route to create a user
// app.post('/api/users', async (req, res) => {
//  // await console.log(req.body);
//   let newUser; 
//   try {
//    newUser = await User.create(req.body);
//     console.log(req.body);
//    res.status(201)//.end();
//   } catch (error) {
//       throw error;
//      }  
//   }
// );


//let newUser;
app.post('/api/users', async (req, res) => {
    try {
      await console.log(req.body);
      await User.create(req.body);
    // console.log(req.body);
      res.status(201).end();
    } catch(error) {
      console.log(error); 
    }
   });

// const users = [];

// app.post('/api/users', (req, res) => {
//   // Get the user from the request body.
//   const user = req.body;

//   // Add the user to the `users` array.
//   users.push(user);

//   // Set the status to 201 Created and end the response.
//   res.status(201).end();
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
