const axios = require("axios");
const faker = require("faker");
const { validateReq } = require("../utils/validateRequests");
const OrdersBlingController = require("./OrdersBlingController");

// PipeDrive commons
// const apiKey = "236ffe4fee7849d756c5b7c6416c8be007a9ee8e";
// const companyName = "teste221";

// Methods
// Used to create fakers data on pipedrive
exports.create = async (req, res) => {
  // Validate datas
  validateReq(req, res);

  // Get datas from request
  const { body, query } = req;

  // PipeDrive commons
  const apiKey = query.pipe_key;
  const companyName = query.company_name;

  // Choose what go send to create a Deal
  const bodyToSend = {
    ...body,
    title: body?.title || faker.name.title(),
    value: body?.value || faker.datatype.number(2000),
    // status: 'won',
    status: body?.status || faker.helpers.randomize(["open", "won", "lost"]),
  };

  // Request to create a Deal on Pipe Drive API
  await axios
    .post(
      `https://${companyName}.pipedrive.com/api/v1/deals?api_token=${apiKey}`,
      bodyToSend
    )
    .then((resp) => {
      res.status(200).send(resp.data); // Return the data from Pipe Drive's Api
    })
    .catch((error) => {
      res.send(error); // Return the error
    });
};

// Used to get the Pipi Drive Deals and send to create on bling anda loval Database
exports.list = async (req, res) => {
  // Validate datas
  validateReq(req, res);

  // Get all query possiblities from url request
  const params = req.query;

  // PipeDrive commons
  const apiKey = params.pipe_key;
  const companyName = params.company_name;

  // Format the actual Date in patterns to Pipi Drive's Api
  const now = new Date();
  const formatedDate = `${now.getFullYear()}-${`0${now.getMonth() + 1}`.slice(
    -2
  )}-${`0${now.getDate()}`.slice(-2)}`;

  // Select between the default data or query data
  const startDate = params.start_date || formatedDate;
  const interval = params.interval || "day";
  const amount = params.amount || 1;
  const fieldKey = params.field_key || "won_time";
  const createOrder = params.create_orders || false;

  // Request on Pipe Drive's Api
  await axios
    .get(
      // Fomated URL
      `https://${companyName}.pipedrive.com/api/v1/deals/timeline?api_token=${apiKey}&start_date=${startDate}&interval=${interval}&amount=${amount}&field_key=${fieldKey}`
    )
    .then(async (resp) => {
      // On success, Try Create a new Order on Bling with response and show error from create or the data from Pipe Drive
      const created = createOrder
        ? await OrdersBlingController.create({
            ...resp.data,
            bling_api: params.bling_key,
          })
        : undefined;

      res.status(200).send(created || resp.data);
    })
    .catch((error) => {
      res.send(error); // Return the error
    });
};
