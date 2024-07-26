const express = require('express');
const app = express();
const PORT = 5000;

const INDEX_ROUTES = require('./routes/index');
app.use(INDEX_ROUTES);

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}/api/v1/`);
})