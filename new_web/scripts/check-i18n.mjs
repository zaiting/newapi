import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const sourceDirectory = path.join(projectDirectory, 'src')
const localesDirectory = path.join(sourceDirectory, 'i18n', 'locales')
const localeNames = ['en', 'zh']
const sourceKeys = JSON.parse(await readFile(path.join(scriptDirectory, 'i18n-source-keys.json'), 'utf8'))
const sourceSet = new Set(sourceKeys)
const locales = {}
let failed = false

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectSourceFiles(entryPath))
    } else if (/\.(?:ts|tsx)$/.test(entry.name)) {
      files.push(entryPath)
    }
  }

  return files
}

function placeholders(value) {
  return [...value.matchAll(/{{\s*([\w.-]+)\s*}}/g)].map((match) => match[1]).sort()
}

for (const localeName of localeNames) {
  const content = await readFile(path.join(localesDirectory, `${localeName}.json`), 'utf8')
  locales[localeName] = JSON.parse(content)
}

if (sourceKeys.length === 0) {
  console.error('i18n 源键清单为空。')
  process.exit(1)
}

const literalKeys = new Set()
for (const sourceFile of await collectSourceFiles(sourceDirectory)) {
  const source = await readFile(sourceFile, 'utf8')
  for (const match of source.matchAll(/\bt\(\s*(['"])(.*?)\1\s*[,)]/gs)) {
    literalKeys.add(match[2])
  }
}

const untrackedLiteralKeys = [...literalKeys].filter((key) => !sourceSet.has(key))
if (untrackedLiteralKeys.length > 0) {
  failed = true
  console.error(`源码存在 ${untrackedLiteralKeys.length} 个未纳入源键清单的字面量 key。`)
}

for (const localeName of localeNames) {
  const locale = locales[localeName]
  const keys = Object.keys(locale)
  const missing = sourceKeys.filter((key) => !Object.prototype.hasOwnProperty.call(locale, key))
  const extras = keys.filter((key) => !sourceSet.has(key))
  const blank = keys.filter((key) => typeof locale[key] !== 'string' || locale[key].trim() === '')
  const placeholderErrors = sourceKeys.filter(
    (key) => Object.prototype.hasOwnProperty.call(locale, key)
      && JSON.stringify(placeholders(key)) !== JSON.stringify(placeholders(locale[key])),
  )

  if (missing.length > 0 || extras.length > 0 || blank.length > 0 || placeholderErrors.length > 0) {
    failed = true
    console.error(
      `${localeName}: missing=${missing.length}, extras=${extras.length}, blank=${blank.length}, placeholderErrors=${placeholderErrors.length}`,
    )
  }
}

for (const localeName of localeNames.slice(1)) {
  const untranslated = sourceKeys.filter((key) => locales[localeName][key] === locales.en[key])
  const localizedRatio = (sourceKeys.length - untranslated.length) / sourceKeys.length
  if (localizedRatio < 0.7) {
    failed = true
    console.error(`${localeName}: 本地化比例过低，仅 ${(localizedRatio * 100).toFixed(1)}%`)
  } else {
    console.log(`${localeName}: 本地化比例 ${(localizedRatio * 100).toFixed(1)}%`)
  }
}

if (failed) process.exit(1)
console.log(`i18n 校验通过：${sourceKeys.length} 个源键，${localeNames.length} 个语言包。`)
