const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const words = data.trim().split(/\s+/).length;
  fs.writeFile('wordcount.txt', `Word count: ${words}`, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Word count ${words} written to wordcount.txt`);
    }
  });
});