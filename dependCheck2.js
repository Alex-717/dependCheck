
import path from 'path'
import fs from 'fs'

const getDepend = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8')
  const reg = /import\s+([^\s]+)\s+from\s+['"]([^'"]+)['"]/g
  const depend = []
  let match
  while ((match = reg.exec(content)) !== null) {
    depend.push({
      name: match[1],
      path: match[2]
    })
  }
  return depend
}

const getDependList = (filePath) => {
  const depend = getDepend(filePath)
  const dependList = []
  depend.forEach(item => {
    const dependPath = path.resolve(path.dirname(filePath), item.path)
    const dependListItem = getDependList(dependPath)
    dependList.push(...dependListItem)
  })
  return dependList
}

const getDependListByFile = (filePath) => {
  const dependList = getDependList(filePath)
  const dependMap = {}
  dependList.forEach(item => {
    dependMap[item.name] = item
  })
  return dependMap
}

const getDependListByDir = (dirPath) => {
  const files = fs.readdirSync(dirPath)
  const depend = []
  files.forEach(file => {
    const filePath = path.resolve(dirPath, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const dependList = getDependListByDir(filePath)
      depend.push(...dependList)
    } else if (stat.isFile()) {
      const dependList = getDependListByFile(filePath)
      depend.push(...dependList)
    }
  })
  return depend
}

