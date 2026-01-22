const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const words = data.trim() === '' ? 0 : data.trim().split(/\s+/).length;

  fs.writeFile(outputPath, `Word Count: ${words}`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Word count written successfully!');
  });
});
