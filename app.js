const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/productsController');
const Sales = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.get('/products', Products.productList);
app.get('/products/:id', Products.productById);
app.post('/products', Products.addProduct);

app.post('/sales', Sales.addSale);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;