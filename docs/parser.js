// parser.js
const fs = require('fs');
const path = require('path');

class Parser {
  constructor(options = {}) {
    this.options = {
      encoding: 'utf8',
      ...options
    };
  }

  parseFile(filePath) {
    return new Promise((resolve, reject) => {
      const absolutePath = path.resolve(filePath);
      
      fs.readFile(absolutePath, this.options.encoding, (err, data) => {
        if (err) {
          reject(new Error(`Failed to read file: ${err.message}`));
          return;
        }

        try {
          const parsedData = this._parse(data);
          resolve(parsedData);
        } catch (parseError) {
          reject(new Error(`Failed to parse file: ${parseError.message}`));
        }
      });
    });
  }

  _parse(data) {
    // Implement specific parsing logic in child classes
    throw new Error('_parse method must be implemented by subclass');
  }

  static validateExtension(filePath, expectedExtension) {
    const ext = path.extname(filePath).toLowerCase();
    return ext === expectedExtension.toLowerCase();
  }
}

module.exports = Parser;