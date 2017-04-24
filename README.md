# mithril-sass-webpack-starter  

### Installation
```
$> npm install
```
### Usage
```
$> npm run start
```
...then open a browser and visit [http://localhost:8080]()  

Modifications made to html, sass and js files will automatically trigger a re-build and browser refresh.

### Deployment
You'll get a simple, production-ready build (located at './build') using
```
$> webpack -p
```

### Notes
This is fairly flexible, but no guarantees about the results of you messing with the architecture :) The basic structure is a global Model/Data object, global State object, and discreet components each with its own SASS file, brought in via ```require``` in the component .js file itself.
