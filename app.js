const express = require('express');
const path = require('path');
const convertSuiteScript = require('./suitescript_converter');
const app = express();
const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('index', { convertedScript: null, noConversionMessage: null });
});

// Handle the conversion
app.post('/convert', (req, res) => {
  const script = req.body.script;
  const convertedScript = convertSuiteScript(script);

  // Check if the convertedScript is the same as the input script
  const noConversion = script === convertedScript;

  console.log('Original Script:', script);
  console.log('Converted Script:', convertedScript);

  res.render('index', {
    convertedScript: noConversion ? null : convertedScript,
    noConversionMessage: noConversion
      ? 'No conversion patterns matched. Please check your input or the conversion logic.'
      : null,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
