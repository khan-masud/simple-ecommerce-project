const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbname = process.env.DB_CLUSTER;

// app.get('/api/config', (req, res) => {
//   const config = {
//     DOMAIN: process.env.DOMAIN,
//     PORT: process.env.PORT,
//   };
//   res.json(config);
// });

const uri = process.env.URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log('Database connected successfully!');


    /* For All Products */
    app.get('/api/products', async (req, res) => {
      try {
        const allProducts = await client.db('dreamershop').collection('products').find().toArray();
        res.send(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: 'Error fetching products' });
      }
    });

    /* For Latest Products */
    app.get('/api/latest-products', async (req, res) => {
      const totalProducts = await client.db('dreamershop').collection('products').countDocuments(); // Count total number of Products

      try {
        const latestProducts = await client.db('dreamershop').collection('products').find().skip(totalProducts - 10).toArray(); // Received latest 10 numbers of products
        res.send(latestProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: 'Error fetching products' });
      }
    })

    app.listen(process.env.PORT, () => {
      console.log('Server is running');
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

run().catch((error) => {
  console.error('Error running server:', error);
});