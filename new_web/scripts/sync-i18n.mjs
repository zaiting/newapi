import { readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const localesDirectory = path.join(projectDirectory, 'src', 'i18n', 'locales')
const localeNames = ['en', 'zh']

for (const localeName of localeNames) {
  const targetPath = path.join(localesDirectory, `${localeName}.json`)
  const locale = JSON.parse(await readFile(targetPath, 'utf8'))
  const sortedLocale = Object.fromEntries(
    Object.entries(locale).sort(([left], [right]) => left.localeCompare(right, 'en')),
  )
  const temporaryPath = `${targetPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(sortedLocale, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, targetPath)
}

console.log(`已规范化并排序 ${localeNames.length} 个语言包。`)
