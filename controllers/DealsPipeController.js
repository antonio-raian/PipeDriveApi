const axios = require('axios');
const faker = require('faker');
const OrdersBlingController = require('./OrdersBlingController');

// PipeDrive commons
const apiKey = '236ffe4fee7849d756c5b7c6416c8be007a9ee8e';
const companyName = 'teste221';

// Methods
// Used to create fakers data on pipedrive
exports.create = async (req, res) => {
  await axios
    .post(
      `https://${companyName}.pipedrive.com/api/v1/deals?api_token=${apiKey}`,{
        title: faker.name.title(),
        value: faker.datatype.number(2000),
        // status: 'won',
        status: faker.helpers.randomize(['open', 'won', 'lost']),
      }
    )
    .then((resp) => {
      res.status(200).send(resp.data);//Return the data from Pipe Drive's Api 
    })
    .catch((error) => {
      res.send(error); //Return the error
    });
};

// Used to get the Pipi Drive Deals and send to create on bling anda loval Database
exports.list = async (req, res) => {
  // Get all query possiblities from url request
  const params = req.query;

  // Format the actual Date in patterns to Pipi Drive's Api
  const now = new Date();
  const formatedDate = `${now.getFullYear()}-${`0${now.getMonth()+1}`.slice(
    -2,
  )}-${`0${now.getDate()}`.slice(-2)}`;

  // Select between the default data or query data
  const startDate = params.start_date || formatedDate;
  const interval = params.interval || 'day';
  const amount = params.amout || 1;
  const fieldKey = params.field_key || 'won_time';

  // Request on Pipe Drive's Api
  await axios
    .get(// Fomated URL
      `https://${companyName}.pipedrive.com/api/v1/deals/timeline?api_token=${apiKey}&start_date=${startDate}&interval=${interval}&amount=${amount}&field_key=${fieldKey}`
    )
    .then(async (resp) => {
      // On success, Try Create a new Order on Bling with response and show error from create or the data from Pipe Drive
      res.status(200).send( resp.data );
    })
    .catch((error) => {
      res.send(error); //Return the error
    });
};
