require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

const errorController = require('./controllers/error-controller');
const sequelize = require('./util/database');

const vehicleRoutes = require('./routes/vehicle');
const userRoutes = require('./routes/user');
const importerRoutes = require('./routes/importer');
const storageRoutes = require('./routes/storage');

const { strategy } = require('./middlewares/passportMiddleware');

const Vehicle = require('./models/vehicle');
const Importer = require('./models/importer');
const User = require('./models/user');
const Role = require('./models/role');
const Storage = require('./models/storage');

const winston = require('./config/winston');
const PORT = process.env.PORT || 3001;

const { exec } = require('child_process');

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

app.use(vehicleRoutes);
app.use(userRoutes);
app.use(importerRoutes);
app.use(storageRoutes);
app.use(errorController);

User.belongsTo(Role);
Vehicle.belongsTo(User);
Vehicle.belongsTo(Importer);
Vehicle.belongsTo(Storage, { as: "storage" });
Vehicle.belongsTo(Storage, { as: "storage_changed" });

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`=== API is listening on port ${PORT} ===`);
            (async()=> {
                await new Promise((resolve, reject) => {
                  const migrate = exec(
                    'sequelize db:migrate',
                    { env: process.env },
                    (err, stdout, stderr) => {
                      resolve();
                    }
                  );
              
                  migrate.stdout.on('data', (data) => {
                    console.log(data);
                    if (data.indexOf('No migrations were executed, database schema was already up to date.') !== -1) {
                      migrate.kill();
                    }
                  });
                });
              })();
        })
    })
    .catch(err => {
        console.log(err)
    })