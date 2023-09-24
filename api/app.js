require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

const errorController = require('./controllers/error-controller');
const sequelize = require('./util/database');

const userRoutes = require('./routes/user');
const investmentRoutes = require('./routes/investment-type');
const apiInformationRoutes = require('./routes/api-information');

const { strategy } = require('./middlewares/passportMiddleware');

const winston = require('./config/winston');
const PORT = process.env.PORT || 3001;

const { exec } = require('child_process');

const InvestmentType = require('./models/investment-type');
const InvestmentDetail = require('./models/investment-detail');
const ApiInformation = require('./models/api-information');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
passport.use(strategy);
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);
app.use(investmentRoutes);
app.use(apiInformationRoutes);
app.use(errorController);

InvestmentDetail.belongsTo(InvestmentType);

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`=== API is listening on port ${PORT} ===`);
            (async () => {
                await new Promise((resolve, reject) => {
                    const migrate = exec('sequelize db:migrate', { env: process.env }, (err, stdout, stderr) => {
                        resolve();
                    });

                    migrate.stdout.on('data', (data) => {
                        console.log(data);
                        if (
                            data.indexOf('No migrations were executed, database schema was already up to date.') !== -1
                        ) {
                            migrate.kill();
                        }
                    });
                });
            })();
        });
    })
    .catch((err) => {
        console.log(err);
    });
