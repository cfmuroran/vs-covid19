const child_process = require('child_process')

const execCommand = async function(cmd) {
	return new Promise((resolve, reject) => {
		child_process.exec(cmd, function(error, stdout, stderr) {
			if (error) {
				reject(error)
			} else {
				resolve(stdout)
			}
		})
	})
}
const add = async function(path) {
  return await execCommand(`git add ${path}`)
}
const push = async function() {
  return await execCommand('git push')
}
const commit = async function(mes) {
  return await execCommand(`git commit -m '${mes}'`)
}
const status = async function() {
  return await execCommand('git status')
}
const update = async function() {
  await add('.')
  await commit()
  await push()
}
const main = async function() {
  //push()
//  console.log(await status())
//  console.log(await commit('update data'))
  console.log(await push())
}
if (require.main === module) {
  main()
}
exports.update = update

