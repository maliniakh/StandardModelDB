# StandardModelDB
Showcase application for browsing elemetary particles (i.e. Standard Model). 

Stack used:
-Node.js / Express.js
-MongoDB
-Jade for templating
-jQuery / CoffeeScript
-Mocha for unit testing

Features:
-filtering by particle groups (leptons, quarks, gluons and so on)
-searching by name
-paginated results
-spelling correction using Levenhstein distance

Installation:
-MongoDB
  no user nor password needed
  $mongo
  > use standardModel
  > load("path to project dir/db.js") to load data
-Unit tests
  $ mocha
- Starting
  $ node bin/www
