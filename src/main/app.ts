import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { createProduct, findAllProduct,updateProductOrder } from './controllers/product.controller';


const appExpress = express();
appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: true }));
appExpress.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: false,  
}));
appExpress.set('view engine', 'hbs');

const publicPath = path.resolve(__dirname, '..', '..', 'src', 'main', 'public');
console.log("Public Directory:", publicPath);

appExpress.use(express.static(publicPath));

const viewsPath = path.resolve(__dirname, '..', '..', "src", 'main', 'views');
console.log("Views Directory:", viewsPath);

appExpress.set('views', viewsPath);

appExpress.post('/createProduct', createProduct );
appExpress.get('/findAllProduct', findAllProduct);
appExpress.post('/api/update-product-order', updateProductOrder);

appExpress.get('/hello', (_, res) => {
  const message = 'Hello, Handlebars World!';
  res.render('index', { message: message });
});

export function apprun() {
  appExpress.listen(3000, () => {
    console.log('Express server started on port 3000');
  });
}
