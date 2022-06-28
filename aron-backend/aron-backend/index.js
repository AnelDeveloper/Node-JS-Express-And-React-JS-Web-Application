const express = require('express');
const app = express();
const cors = require('cors');
const cookieParaser = require('cookie-parser');
const path = require('path')

const bodyParser = require('body-parser');



app.use(express.json());
app.use(cookieParaser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


const db = require('./models');

//Routes
const subcategoriesRouter = require('./routes/Subcategories');
app.use('/subcategories', subcategoriesRouter);
const categoriesRouter = require('./routes/Categories');
app.use('/categories', categoriesRouter);
const reportsRouter = require('./routes/Reports');
app.use('/reports', reportsRouter);
const adminRouter = require('./routes/Admin');
app.use('/admin', adminRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("running on port: 3001")
    });
})


