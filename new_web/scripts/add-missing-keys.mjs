import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const localesDirectory = path.join(projectDirectory, 'src', 'i18n', 'locales')
const partsDirectory = path.join(scriptDirectory, 'i18n-parts')
const localeNames = ['en', 'zh']
const sourceKeys = JSON.parse(await readFile(path.join(scriptDirectory, 'i18n-source-keys.json'), 'utf8'))

function sortObject(value) {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right, 'en')))
}

function placeholders(value) {
  return [...value.matchAll(/{{\s*([\w.-]+)\s*}}/g)].map((match) => match[1]).sort()
}

function assertTranslationMap(localeName, translations) {
  const sourceSet = new Set(sourceKeys)
  const translationKeys = Object.keys(translations)
  const missing = sourceKeys.filter((key) => !Object.prototype.hasOwnProperty.call(translations, key))
  const extras = translationKeys.filter((key) => !sourceSet.has(key))

  if (missing.length > 0 || extras.length > 0) {
    throw new Error(`${localeName} 键集合不一致：缺失 ${missing.length}，多余 ${extras.length}`)
  }

  for (const key of sourceKeys) {
    const value = translations[key]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`${localeName} 存在空翻译：${key}`)
    }

    if (JSON.stringify(placeholders(key)) !== JSON.stringify(placeholders(value))) {
      throw new Error(`${localeName} 占位符不一致：${key}`)
    }
  }
}

await mkdir(localesDirectory, { recursive: true })
const localeMaps = { en: Object.fromEntries(sourceKeys.map((key) => [key, key])) }

for (const localeName of localeNames.slice(1)) {
  const partPath = path.join(partsDirectory, `${localeName}.json`)
  localeMaps[localeName] = JSON.parse(await readFile(partPath, 'utf8'))
}

for (const localeName of localeNames) {
  assertTranslationMap(localeName, localeMaps[localeName])
}

const temporaryFiles = []
for (const localeName of localeNames) {
  const targetPath = path.join(localesDirectory, `${localeName}.json`)
  const temporaryPath = `${targetPath}.tmp`
  const content = `${JSON.stringify(sortObject(localeMaps[localeName]), null, 2)}\n`
  await writeFile(temporaryPath, content, 'utf8')
  temporaryFiles.push({ temporaryPath, targetPath })
}

for (const file of temporaryFiles) {
  await rename(file.temporaryPath, file.targetPath)
}

console.log(`已原子写入 ${localeNames.length} 个语言包，每个 ${sourceKeys.length} 个键。`)
