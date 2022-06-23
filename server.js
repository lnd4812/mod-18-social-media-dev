const mongoose = require('mongoose');





mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Mod-18-social-media-dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// to log mongo queries being executed:
mongoose.set('debug', true);