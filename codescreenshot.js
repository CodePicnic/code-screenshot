var system = require('system'),
    fs = require('fs'),
    page = require('webpage').create();

var inputFile = system.args[1],
    outputFile = inputFile.split('.'),
    fileExtension = outputFile.pop(),
    currentMode,
    mimeType = system.args[2];

outputFile.push('png');
outputFile = outputFile.join('.');

page.open('codemirror.html', function() {
  page.clipRect = {
    top: 0,
    left: 0,
    width: 600,
    height: 315
  };

  page.viewportSize = {
    width: 600,
    height: 315
  };

  page.onConsoleMessage = console.log.bind(console);

  currentMode = page.evaluate(function(fileExtension) {
    return window.CodeMirror.findModeByExtension(fileExtension);
  }, fileExtension);

  page.includeJs('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/mode/' + currentMode.mode + '/' + currentMode.mode + '.min.js', function() {
    page.evaluate(function(code, mimeType) {
      window.CodeMirror.runMode(code, mimeType, document.querySelector('#snippet'));
    }, fs.read(inputFile), mimeType || currentMode.mime);

    page.render(outputFile);
    console.log(outputFile);
    phantom.exit();
  });
});