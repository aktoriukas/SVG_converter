const fs = require("fs")
// read all files in svg folder
const files = fs.readdirSync("./svg")

const boiler = fs.readFileSync("./boiler.tsx", "utf8")

// adding react import to the top of the file
let newContent = `import * as React from "react" \n\n`

// create a new array with the file names
files.map((file, index) => {
  const svg = fs.readFileSync(`./svg/${file}`, "utf8").replace(/\n/g, "")

  const viewBox = svg.match(/viewBox="([\d\.\-\s]+)"/)[0]

  const svgInner = cleanSVG(svg.match(/<svg.*>(.*)<\/svg>/)[0])

  const name = `Icon_${file.replace(".svg", "")}`

  let svgEl = boiler.replace("Boiler", name)
  svgEl = svgEl.replace("viewBox", viewBox)
  svgEl = svgEl.replace("replace", svgInner)

  newContent = `${newContent} \n\n ${svgEl}`
})

function cleanSVG(svg) {
  const closing_1 = svg.indexOf(">")

  let cleanSVG = svg.slice(closing_1 + 1)
  cleanSVG = cleanSVG.slice(0, cleanSVG.length - 6)

  return cleanSVG
}

fs.writeFile("./components.tsx", newContent, () => {
  console.log("done")
})
