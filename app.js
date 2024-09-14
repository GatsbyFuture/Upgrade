// HTTP method - GET, POST, DELETE, PUT
const express = require('express')

const app = express();

const PORT = 8000;

app.listen(PORT, () => console.log(`Listening 0n - http://localhost:${PORT}`));