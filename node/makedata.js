const fs = require('fs')
const fetch = require('node-fetch')
const util = require('./util.js')

const fetchText = async function(url) {
  const data = await (await fetch(url)).text()
	return data
}
const fetchGoogleSpreadSheetCSV = async function(key) {
	const csvurl = `https://docs.google.com/spreadsheets/d/e/${key}/pub?gid=0&single=true&output=csv`
  const csv = await fetchText(csvurl)
  return csv
}
const makeSupport = async function(fn, key) {
  const csv = await fetchGoogleSpreadSheetCSV(key)
  let csvold = null
  try {
    csvold = fs.readFileSync(fn + '.csv')
  } catch (e) {
  }
  if (csvold == csv) {
    console.log('no updates')
    return false
  }
  const date = '-' + util.getYMDHMS()
  fs.writeFileSync(fn + '.csv', csv)
  fs.writeFileSync('data/' + fn + date + '.csv', csv)
  const data = util.convertCSVtoArray(csv)
	const json = util.csv2json(data)
  console.log(json)
  const sjson = JSON.stringify(json)
  fs.writeFileSync(fn + '.json', sjson)
  fs.writeFileSync('data/' + fn + date + '.json', sjson)
  console.log(json.length)
  return true
}
const main = async function() {
  // ver1
  //makeSupport('vscovid19-data', '2PACX-1vSFMNp5HcRNOF5MrAujEUWR1dIoX2mncMEWTbPlVAaJqKWiq831-6gnCyI7n_G8YfPqNQXrfwyVjyHL')
  // ver2 // copy
  makeSupport('vscovid19-data2', '2PACX-1vSW2YVyhriF2ke8yIat_ebzbItjqFTeMU3G9fTMVh-GnIcJK-PE20oWPP4acJxfrnf_1tgmzozPgxKv')
}
if (require.main === module) {
  main()
}
exports.updateData = makeSupport
