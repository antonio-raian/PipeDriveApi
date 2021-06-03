# PipeBlingApi
By Antonio Raian

## Introduction
PipeBlingApi is an API to integrate two APIs, the business organizer [Pipe Drive] (https://www.pipedrive.com/pt) and the ERP system, [Bling] (https: //www.bling.com.br /b/home).
The app is able to associate trades won on PipeDrive with sales orders from Bling.

To create this API, we use [Nodejs](https://nodejs.org/) together with the framework [Expressjs](https://expressjs.com/pt-br/) to generate the endpoint and its routes. To persist the data we use the non-relational database, [MongoDB](https://www.mongodb.com/).

## Routes
The urls for all the routes is the same name of your module.

Example: To access the route of create or list of Deals, you use `<ip>:<port>/deals`. To differentiate use only HTTP methods, `GET` to list and `POST` to create.

### Deals
1. **List** `GET => <ip>:<port>/deals`
This route is used to see the deals from Pipe Drive account and to create a order from this datas on Bling.
 
| Attributes | Format | Description |
|:----------|:--------|:----------------|
| pipe_key `required` |  | This query attribute is responsible, together with the `company_name`, for doing the user validation in the Pipe Drive API. The value here should be the same as provided by the Pipe Drive API documentation for the `api_token` field|
| company_name `required` |  | In conjunction with the `pipi_key` field is responsible for user validation. This attribute must have the same value as the `companydomain` given in the Pipe Drive api;|
| start_date | `YYYY-MM-DD` | Attribute responsible for informing the start date for searching the Pipe Drive api. It is used in the request to get deals; If omitted or empty returns the search from the current date;|
| interval | | Field used to determine the type of range that will be fetched with `amount`. By default it is `day`, but it can be `week`, `month` or `quarter`;|
| amount | | Quantity of `interval` starting from `start_date`; Default `1`;|
| field_key | | Attribute used to determine which ideal field should be checked for `start_date` in `interval`. The field must be of type `Date`; Default `won_time`; |
| create_orders | | Attribute used to create or not the fetched orders. Default `false`; If `true` the list of deals will be transformed into sales orders in bling; |
| bling_key | | This attribute is required if `create_orders` is `true`; Its value is the same for `apiKey` of the Bling API and will be used to validate the user in the request to create sales order;|


2. **Create** `POST => <ip>:<port>/deals`
This route is used to create the deals on Pipe Drive.

* In query we have the attributes:

| Attributes | Description |
|:----------|:----------------|
| pipe_key `required` | This query attribute is responsible, together with the `company_name`, for doing the user validation in the Pipe Drive API. The value here should be the same as provided by the Pipe Drive API documentation for the `api_token` field|
| company_name `required` | In conjunction with the `pipi_key` field is responsible for user validation. This attribute must have the same value as the `companydomain` given in the Pipe Drive api;|

* In body we have:
> The body is not required, if not informed, the deal will be created with random data;
> The below data is the minimum. To full data see the Pipe Drive Api docs;

| Attributes | Description |
|:----------|:----------------|
| title | The deal's title;|
| value | The deal's value;|
| status | The deal's status|


### Orders
1. **List** `GET => <ip>:<port>/orders`
 
 This route list the datas saved in local database. The informations is from the creation of Order on Bling with the Pipe Drive deal's datas.
 
| Atributes | Format  | Description |
|:----------|:----------------|
| date | `YYYY-MM-DD` | Attribute responsible for informing the start date of the search for orders in the local database;|
| amount | | Number of days that will be part of the search; Default `1`;|
| count | | Attribute used to select orders by number of registered items;|
