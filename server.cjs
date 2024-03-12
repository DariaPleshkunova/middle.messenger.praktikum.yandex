const express = require('express');

const app = express();
const PORT = 3000;

const dirPath = `${__dirname}/dist`;

app.use(express.static(dirPath));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
