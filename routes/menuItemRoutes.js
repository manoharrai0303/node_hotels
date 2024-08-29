const express = require('express');
const router = express.Router()

const MenuItem = require('./../models/MenuItem');

//POST Method to add a Menu Item
router.post('/', async (req, res) => {
    try {
        const menuItemData = req.body; // Assuming the request  body contains menu item data

        // Create a new menu item using the Mongoose model
        const menuItem = new MenuItem(menuItemData);
        // Save the new menu item to the database
        const menu_data = await menuItem.save();
        console.log('Menu item saved');
        res.status(201).json(menu_data);
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET method to get the Menu Items
router.get('/', async (req, res) => {
    try {
        // Use the Mongoose model to find all menu items in the database
        const menuItems = await MenuItem.find();
        // Send the list of menu items as a JSON response
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType ==
            'spicy') {
            const response = await MenuItem.find({ taste: tasteType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Taste type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;