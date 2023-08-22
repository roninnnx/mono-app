const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const NoteCategory = require('./models/note-category');
const app = express();
const cors = require('cors');

// possible middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://186.152.13.206:3001', 'http://127.0.0.1:3001', 'http://localhost:3001', 'http://192.168.0.87:3001'],
    credentials: true, // cookies and headers on
}));

sequelize
    .sync()
    .then(() => {
        console.log('Conexión a la base de datos establecida.');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// route def
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
app.use('/categories', categoryRoutes);

const Note = require('./models/note');
const Category = require('./models/category');

Note.belongsToMany(Category, { through: NoteCategory });
Category.belongsToMany(Note, { through: NoteCategory });


// error manage
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({ error: error.message });
});

// server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
