const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Mod-18-social-media-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// to log mongo queries being executed:
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));