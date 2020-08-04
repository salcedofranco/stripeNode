const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_51HAdTXJWYHZivIgxjOE2l3NrAN9tVv6NRhTzZNixQwV84qR4JG8KJ83yXuceYJEYYpekhYQcji0PRnF21oeUefN800P0CY3c90');

router.get('/', (req, res) => {
    res.render('home')
    
});

//creacion de usuario y orden de compra
router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const order = await stripe.charges.create({
        amount: '50000',
        currency: 'usd',
        customer: customer.id,
        description: 'Termotanque solar'
    });
   
    console.log(order.id);
    res.send('pago recibido!');
});


//ACA LLAMAMOS A INDEX.HBS
//app.get('/', (req, res) => { 
// Sirve el cuerpo de la página aka "main.handlebars" al contenedor // aka "index.handlebars" 
//res.render('main', {layout : 'index'});
//});


module.exports = router;