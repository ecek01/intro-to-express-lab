const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Listening on 3000');
});

app.get('/', (req, res) => {
    res.send('Hello, this is the homepage!');
  });

// Exercise 1. Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Whats up, ${username}`);
})

// Exercise 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    const maxNumber = parseInt(number, 10);
    if (isNaN(maxNumber)) {
        return res.send('You must specify a number');
    }
    const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));
    res.send(`You rolled a ${rolledNumber}`);
})

// Exercise 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10); 
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');
  }
  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// Exercise 4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }
    const responseText = filteredShoes
        .map(shoe => `<p>Name: ${shoe.name}, Price: ${shoe.price}, Type: ${shoe.type}</p>`)
        .join('');

    res.send(`
        <html>
        <body>
            ${responseText}
        </body>
        </html>
    `);
});

