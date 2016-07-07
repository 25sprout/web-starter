# Web Starter

### Features
- webpack
- react
- babel / ES6
- sanitize.css
- cssnext
- css module
- react css modules
- eslint
- stylelint
- hot/live reload (including presentational component)
- offline support
- json-server fake api
- react-router
- redux
- react-router-redux
- immutable.js
- code splitting
- long-term caching

### Getting Started
Clone this project, and...
```bash
rm -rf .git # clean up git
npm install # install dependencies
npm start
```
Head to [http://localhost:8000/](http://localhost:8000/).

You can also open port other than 8000, take 8080 for example.
```bash
npm start -- -p 8080
```
Or simply edit the config in `package.json`.

### Build
```bash
npm run build
```
Built files are now in `dist/`.

### lint
```bash
npm run lint
```

### json-server
run the `npm start` command or `npm run json-server` command will start a fake api server with basic CRUD. The port and delay latency for each api call are `8001` and `500ms` by default, you can also change them in the config in `package.json` or by flag `-a` and `-d` respectively.
