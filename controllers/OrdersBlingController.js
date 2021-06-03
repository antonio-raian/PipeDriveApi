const axios = require("axios");
const BlingOrders = require("../models/BlingOrders");

// Bling commons
const api_key =
  "b1d0d2c30eda80906906362d60ef973e5a1ab2d0b127137965602098c78382f9294ed7b3";
const url = `https://bling.com.br/Api/v2/pedido/json?apikey=${api_key}`;

// Methods
// Used Internally to create a Order on Bling with deals from PipeDrive
exports.create = async (param) => {
  // Get Deals and Totals from parameterized data
  const { deals, totals } = param.data[0];

  // Get the current date and format to patterns for XML Bilng Order
  const now = new Date();
  const formatedDate = `${`0${now.getDate()}`.slice(-2)}/${`0${
    now.getMonth() + 1
  }`.slice(-2)}/${now.getFullYear()}`;

  // Transform the deals in itens for XML Order on Bling
  const itens = deals.map(
    (deal) =>
      `<item><codigo>${deal.id}</codigo><descricao>${deal.title}</descricao><qtde>1</qtde><vlr_unit>${deal.value}</vlr_unit></item>`
  );

  // Encoded XML
  const xml = encodeURIComponent(
    `<?xml version="1.0" encoding="UTF-8"?><pedido><data>${formatedDate}</data><cliente><nome>Pedido dia ${formatedDate}</nome></cliente><itens>${itens}</itens></pedido>`
  );

  // Request to create order on Bling's Api
  await axios
    .post(`${url}&xml=${xml}`, { headers: { "Content-Type": "text/xml" } })
    .then(async (res) => {
      // Processing the response to filter errors
      const pedidos = res.data.retorno?.pedidos;
      const erros = res.data.retorno?.erros;

      // On sucess
      if (pedidos && pedidos.length > 0) {
        // Create a colection on database
        const bling = new BlingOrders({
          date: now,
          itens,
          valueTotal: totals.won_values,
          count: totals.count,
        });
        await bling.save();
      } else if (erros) {
        // On error
        // Return the object with error message
        return erros[0].erro;
      }
      return undefined;
    })
    .catch((e) => e); // Return the error on integration
};

// Used to catch the Documents on database
exports.list = async (req, res) => {
  // Get all the querys on request
  const { query } = req;

  // Create a constroller search object
  const search = {};

  // Check if query exists
  if (Object.keys(query).length > 0) {
    // Create a search from date start and date end
    let date;
    const lastDate = new Date();
    if (query.date) {
      date = new Date(query.date);
      lastDate.setDate(date.getDay() + 1); // If not amount the interval is one day
      if (query.amount) {
        // The last day is the first + the amount
        lastDate.setDate(date.getDay() + Number(query.amount));
      }
      search.date = { $gte: date, $lte: lastDate }; // Create a query search from dates
    }
    // Find the orders by quantity
    if (query.count) {
      search.count = query.count;
    }
  }

  // Send the answer with all the filtered Orders on database
  res.send(await BlingOrders.find(search));
};
