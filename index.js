const express = require('express');
const app = express();
const redis = require('./redis'); 

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/products', async (req, res) => {
    try {
        const cacheData = await redis.get('products');
        if (cacheData) {  
            return res.status(200).json(JSON.parse(cacheData));
        }
        const result = await fetch('https://66cc584aa4dd3c8a71b7449b.mockapi.io/products');
        const data = await result.json();
        await redis.set('products', JSON.stringify(data), 'EX', 60 * 60); // Cache for 1 hour
        res.status(200).json(data);
    } catch (error) {
        throw new Error("Error while fetchinng data");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});