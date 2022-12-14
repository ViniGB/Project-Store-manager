const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/productsController');
const Sales = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.get('/products/search', Products.productByName);
app.get('/products/:id', Products.productById);
app.get('/products', Products.productList);
app.put('/products/:id', Products.editProduct);
app.delete('/products/:id', Products.removeProduct);
app.post('/products', Products.addProduct);

app.get('/sales', Sales.salesList);
app.get('/sales/:id', Sales.saleById);
app.put('/sales/:id', Sales.editSale);
app.delete('/sales/:id', Sales.removeSale);
app.post('/sales', Sales.addSale);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;