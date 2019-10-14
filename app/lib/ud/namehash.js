import sha3 from './sha256'

const nil = '0000000000000000000000000000000000000000000000000000000000000000'
const regx = /^0x/

export default (name = '', parent = nil) => {
  if (regx.test(parent)) {
    parent = parent.substr(2)
  }
  name = name
    .split('.')
    .reverse()
    .filter(label => label)
    .map(label => sha3(label))

  console.log(name)
  const address = [parent]
    .concat(name)
    .reduce((a, labelHash) =>
      sha3(a + labelHash, 'hex')
    )
  return address
}
