// console.log("server file is running");


// function add(a,b){
//     return a+b;
// }


// var add=(a,b)=>{   //arrow function
//   return a+b;
// }
// var result=add(5,7);
// console.log(result);


//Jab bhi kisi poackage ka use karna hota hai to pahle us
// package ko file me import karte hai

// var fs = require('fs');
// var os = require('os');

// var user=os.userInfo();    //inbuilt function
// console.log(user);
// console.log(user.username);


// //To send  a greeting message greeting file is created using this method
// fs.appendFile('greeting.txt', 'Hi'+ user.username + '!\n', ()=>{
//      console.log('file is created');
// });

// console.log(os);
// console.log(fs);


//import file (link notes.js to server.js)
//yaha notes.js ko server.js se link kiya gya hai using require

// const notes=require('./notes.js');

// console.log('server file is avoilable');

// var age=notes.age;
// var result =notes.addNumber(age+18,10);
// console.log(age);
// console.log('result is now'+ result);


//lodash package in nodejs
// var _=require('lodash');   
// var data=["person","person",1,2,1,2,'name','age','2'];
// var filter= _.uniq(data)  //unique is built-in fxn which is used in lodash
// console.log(filter);  //  ['person' , 1,2, 'name' ,'age','2']
// console.log(_.isString('Manohar'));  //true
// console.log(_.isString(6));  //false


//InterConversion JSON(String) to an Object in Node.js
// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
//  const jsonObject = JSON.parse(jsonString); // Convert JSON string to object
//  console.log(jsonObject.name); // Output: John
//  console.log(jsonObject); // Output: {name: 'John' , age: 30, city: 'New York}


// Convert object JSON string
// const objectToConvert = { 
//     name: "Alice",
//     age: 25 
//     };
//  const json = JSON.stringify(objectToConvert); 
//  console.log(json); // Output: {"name": "Alice", "age":25
//     console.log(typeof json); //string



//Express js  tutorial for beginers

const express = require('express')
const app = express();

const db = require('./db')

// const Person = require('./models/Person');
// const MenuItem = require('./models/MenuItem');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
      res.send('Welcome to our hotel');
})

// //POST route to add a person
// app.post('/person', async (req, res) => {
//       try {
//             const data = req.body //Assuming the request bidy contains the person data
//             //Create a new person document using the Mongoose model
//             const newPerson = new Person(data);

//             //Save the new person to the database
//             const response = await newPerson.save();
//             console.log('data saved');
//             res.status(200).json(response);

//       }
//       catch (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//       }
// })

// //GET method to get the person data from database
// app.get('/person', async (req, res) => {
//       try {
//             const data = await Person.find();
//             console.log('data fetched');
//             res.status(200).json(data);
//       } catch (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//       }
// })

//POST Method to add a Menu Item
// app.post('/menu', async (req, res) => {
//       try {
//             const menuItemData = req.body; // Assuming the request  body contains menu item data

//             // Create a new menu item using the Mongoose model
//             const menuItem = new MenuItem(menuItemData);
//             // Save the new menu item to the database
//             const menu_data = await menuItem.save();
//             console.log('Menu item saved');
//             res.status(201).json(menu_data);
//       } catch (error) {
//             console.error('Error creating menu item:', error);
//             res.status(500).json({ error: 'Internal server error' });
//       }
// });

// //GET method to get the Menu Items
// app.get('/menu', async (req, res) => {
//       try {
//             // Use the Mongoose model to find all menu items in the database
//             const menuItems = await MenuItem.find();
//             // Send the list of menu items as a JSON response
//             res.json(menuItems);
//       } catch (error) {
//             console.error('Error fetching menu items:', error);
//             res.status(500).json({ error: 'Internal server error' });
//       }
// });

// app.get('/person/:workType', async (req, res) => {
//       try {
//             const workType = req.params.workType; // Extract the work type from the URL parameter
//             if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//             // Assuming you already have a Person model and MongoDB connection set up
//             const response = await Person.find({ work: workType });
//             console.log('response fetched');
//             // Send the list of persons with the specified work type as a JSON response
//             res.status(200).json(response);
//             }else{
//                   res.status(404).json({error: 'Invalid work type'});
//             }
//       } catch (err) {
//             console.error( err);
//             res.status(500).json({ error: 'Internal server error' });
//       }
// });



// app.get('/chicken', (req, res) => {
//       res.send('sure sir, i would love to serve chicken')
// })

// app.get('/idli', (req, res) => {
//       var customized_idli = {
//             name: 'rava idli',
//             size: '10 cm diameter',
//             is_sambhar: true,
//             is_chutney: false
//       }
//       res.send(customized_idli)
// })  //3000 port number (yah bta raha hai ki 3000 port number par server present hai)

//Import the router files
const personRoutes=require('./routes/personRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes')

//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000, () => {
      console.log('listening on port 3000');
})

