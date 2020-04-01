const makedata = require('./makedata.js')
const util = require('./util.js')
const git = require('./git.js')

const DT = 1000 * 60 * 10 // 10min

const main = async function() {
  for (;;) {
    if (makedata.updateData()) {
      git.update()
      console.log('updated')
    }
    await util.sleep(DT)
  }
}
if (require.main === module) {
  main()
}
