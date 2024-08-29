const express = require('express');
const router = express.Router()
const Person = require('./../models/Person');

//POST route to add a person
router.post('/', async (req, res) => {
      try {
            const data = req.body //Assuming the request bidy contains the person data
            //Create a new person document using the Mongoose model
            const newPerson = new Person(data);

            //Save the new person to the database
            const response = await newPerson.save();
            console.log('data saved');
            res.status(200).json(response);
      }
      catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
      }
})

//GET method to get the person data from database
router.get('/', async (req, res) => {
      try {
            const data = await Person.find();
            console.log('data fetched');
            res.status(200).json(data);
      } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
      }
})

router.get('/:workType', async (req, res) => {
      try {
            const workType = req.params.workType; // Extract the work type from the URL parameter
            if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
                  // Assuming you already have a Person model and MongoDB connection set up
                  const response = await Person.find({ work: workType });
                  console.log('response fetched');
                  // Send the list of persons with the specified work type as a JSON response
                  res.status(200).json(response);
            } else {
                  res.status(404).json({ error: 'Invalid work type' });
            }
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
      }
});



//Update the database
router.put('/:id', async (req, res) => {
      try {
            const personId = req.params.id; // Extract the person's ID from the URL parameter
            const updatedPersonData = req.body; // Updated data for the person
            // Assuming you have a Person model
            const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
                  new: true, // Return the updated document
                  runValidators: true, // Run Mongoose validation
            })

            if (!response) {
                  return res.status(404).json({
                        error: 'Person not found'
                  });
            }
            console.log('data updated');
            // Send the updated person data as a JSON response
            res.status(200).json(response);
      } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
      }
});



//Delete a element from database
router.delete('/:id', async (req, res) => {
      try {
            const personId = req.params.id; // Extract the person's ID from the URL parameter
            // Assuming you have a Person model
            const response = await Person.findByIdAndDelete(personId);
            if (!response) {
                  return res.status(404).json({ error: 'Person not found' });
            }
            console.log('data deleted');
            
            res.status(200).json({message: 'person Deleted Successfully'});
      } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
      }
})



module.exports = router;