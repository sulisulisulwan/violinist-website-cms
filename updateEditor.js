import fs from 'fs'
import packageJson from './package.json' assert { type: 'json' }
import { exec } from 'child_process'


try {
  fs.unlinkSync('./package-lock.json')
} catch(e) {

}

const trimNewLine = (string) => {
  let newString = ''
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '\n') continue;
    newString += string[i]
  }
  return newString
}

exec('npm view texteditorforcms version', (err, stdout) => {
  let newestVersion = stdout
  packageJson.dependencies.texteditorforcms = '^' + trimNewLine(newestVersion)
  packageJson.dependencies.texteditorforcms
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2))
  exec('npm i')
})


