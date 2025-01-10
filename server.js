const express = require('express');
// Create an Express app
const app = express();

///////////////
// Collectibles
///////////////
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//////////
// ROUTES
//////////

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.send({ Message: `Hello there, ${name}!` });
});

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);

    // Check to see if it's a valid number
    if (isNaN(number)) {
        return res.status(404).send('Invalid number!');
    }

    // Generate a random number between 0 and the specified number
    const roll = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${roll}`);
});

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index)) {
        return res.status(404).send('Specify a valid number!');
    }

    if (index < 0 || index >= collectibles.length) {
        return res.status(404).send('Collectible not found.');
    } 

    // Send a more readable response
    res.send(`Collectible at index ${index}: ${collectibles[index].name} for $${collectibles[index].price}`);
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    // Filter by 'min-price'  
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        if (!isNaN(minPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
        }
    }

    // Filter by 'max-price'
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        if (!isNaN(maxPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
        }
    }

    // Filter by 'type'
    if (req.query['type']) {
        const type = req.query['type'].toLowerCase();
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type);
    }

    // Respond with the filtered list of shoes
    res.json(filteredShoes);
});

/////////////
/// Listener
/////////////
app.listen(3000, () => {
    console.log('🎧 Listening on port 3000');
});