
import path from 'path'
import fs from 'fs'

const projectRoot = path.resolve(path.dirname(''))

async function getPkgJson () {
  const pkgPath = path.resolve(projectRoot, 'package1.json')
  console.log('pkgPath', pkgPath)
  try {
    const fileContent = await fs.promises.readFile(pkgPath, 'utf8')
    console.log(fileContent)
  }catch (err) {
    console.log('err', err)
  }
}

getPkgJson()