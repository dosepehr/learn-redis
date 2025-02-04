const redis = require('redis');
const express = require('express');
const client = redis.createClient();

client.on('error', (err) => console.log(err));
client.connect().then(() => console.log('Redis connected'));

const app = express();
app.get('/', (req, res) => {});
app.get('/set', async (req, res) => {
    client.lPush('courses', ['js', 'ts']);
    const list = await client.lRange('courses', 0, -1);
    console.log(list);
    res.json({ list });
});

app.get('/setJson', async (req, res) => {
    const data = {
        name: 'ali',
        id: 'mmd',
    };
    await client.set('user_1000', JSON.stringify(data));
    res.json({ message: 'done' });
});
app.get('/getJson', async (req, res) => {
    const data = await client.get('user_1000');
    res.json({ message: JSON.parse(data) });
});
app.listen(3000, () => console.log('app connected'));
