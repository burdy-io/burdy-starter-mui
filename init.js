import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Colors = {
  cms: chalk.magentaBright,
  web: chalk.blueBright
};

const Output = {
  cms: (...messages) => console.log(`[${Colors.cms('Burdy')}] ${messages.join(' ')}`),
  web: (...messages) => console.log(`[${Colors.web('Next')}] ${messages.join(' ')}`),
};

const rootDirectory = __dirname;
const cmsDirectory = path.join(rootDirectory, 'cms');
const webDirectory = path.join(rootDirectory, 'web');

(async () => {
  // Prepare CMS
  Output.cms('Installing dependencies...');
  await execa('npm', ['install'], { cwd: cmsDirectory, stdio: 'inherit' });
  Output.cms('Successfully installed dependencies!');

  Output.cms('Preparing database...');
  await execa('npm', ['run', 'db:init'], { cwd: cmsDirectory, stdio: 'inherit' });
  Output.cms('Database ready.');

  Output.cms('Importing data...');
  await execa('npm', ['run', 'import'], { cwd: cmsDirectory, stdio: 'inherit' });
  Output.cms('Data imported!')

  // Generate API Key and import it to .env
  Output.cms('Generating key...');
  const keyProcess = await execa('npm', ['run', 'generate:key', 'demo'], { cwd: cmsDirectory });
  const key = keyProcess.stdout.match(/GENERATED_KEY="(.*)"/)[1];
  fs.appendFileSync(path.join(webDirectory, '.env'), `\nBURDY_ACCESS_TOKEN=${key}`);
  Output.web('Key added to .env');

  // Prepare Frontend
  Output.web('Installing dependencies...');
  await execa('npm', ['install'], { cwd: webDirectory, stdio: 'inherit' });
  Output.web('Successfully installed dependencies!');
})();
