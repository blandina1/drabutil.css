import yaml from 'js-yaml'
import fs from 'fs/promises'

function swap(obj) {
  return Object.fromEntries(Object.entries(obj).map(a => a.reverse()))
}

const utilities = yaml.load(await fs.readFile('./utilities.yml', 'utf8'))
const properties = swap(yaml.load(await fs.readFile('./properties.yml', 'utf8')))
const values = swap(yaml.load(await fs.readFile('./values.yml', 'utf8')))

const css = utilities
  .map((obj) =>
    Object.entries(obj).map(
      ([prop, val]) => `.${properties[prop]}-${values[val]}{${prop}:${val}}`
    )
  )
  .flat()
  .join('')

await fs.writeFile(
  './css/drabutil.css',
  '/*! drabutil.css | MIT License | github.com/heiskr/drabutil.css */' + css
)
