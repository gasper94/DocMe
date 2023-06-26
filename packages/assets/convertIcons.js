const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const iconsFolderPath = 'folder'; // Replace with your icons folder path

const convertIcons = () => {
  const files = fs.readdirSync(iconsFolderPath);

  files.forEach((file) => {
    const filePath = path.join(iconsFolderPath, file);
    const iconName = path.basename(file, '.svg');
    const outputDir = path.join('./Icons', iconName);

    execSync(`npx svgr --native --ext js --out-dir ${outputDir} ${filePath}`, {
      stdio: 'inherit',
    });
  });

  console.log('Icons converted successfully!');
};

convertIcons();
