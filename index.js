#!/usr/bin/env node

const fs = require('fs');
const components = process.argv.slice(2);

const componentDefaultContent = componentName =>
`import React, { Component } from 'react';

import styles from './${componentName}.scss';

class ${componentName} extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default ${componentName};
`;

const indexDefaultContent = componentName =>
`export { default } from './${componentName}';
`;

const createFile = (fileName, contents) => fs.writeFile(fileName, contents, err => {
  if (err) {
    return console.log(err);
  }
});

components.forEach(component => {
  const componentName = component.charAt(0).toUpperCase() + component.slice(1);
  const folderPrefix = `${component}/`;

  fs.existsSync(componentName) || fs.mkdirSync(componentName);

  createFile(`${folderPrefix + componentName}.js`, componentDefaultContent(componentName));
  createFile(`${folderPrefix + componentName}.scss`, '');
  createFile(`${folderPrefix}index.js`, indexDefaultContent(componentName));

  console.log('Successfully created '+componentName+' component!');
});
