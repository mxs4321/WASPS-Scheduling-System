# Server

The server side requires PHP and a MySQL Database to be setup before it can be run. Update the information in `/server/.env` to reflect your database's login. To install PHP dependencies you must have [Composer](https://getcomposer.org/) on your computer.

## Running the Server

To Start the server you must change into the directory with `cd server`. Run `composer install` to install the dependencies and then start the server using `composer start`.

```shell
cd server
composer install
composer start
```