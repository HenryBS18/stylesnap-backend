const { exec } = require('child_process');
const { existsSync } = require('fs')
const dotenv = require('dotenv')

dotenv.config()

if (!process.env.HOST) throw new Error('HOST not defined in env')

const cmd = `rm -rf dist/ && tsc && cp ssl/${process.env.HOST}* dist/ && tsc -w`

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error(err.message);
    return
  }

  console.error(`stderr: ${stderr}`);
  console.log(`stdout: ${stdout}`);
})

const path = 'dist/'

if (existsSync(path)) {
  console.log('executed');
}
