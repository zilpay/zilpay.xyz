import sha3 from './sha3'

const nil = '0000000000000000000000000000000000000000000000000000000000000000'
const regx = /^0x/

export default (name = '', { parent = null, prefix = true } = {}) => {
  parent = parent || nil
  if (regx.test(nil)) {
    parent = parent.substr(2)
  }
  name = name
    .split('.')
    .reverse()
    .filter(label => label)
    .map(label => sha3(label, { hexPrefix: false }))
  const address = [parent]
    .concat(name)
    .reduce((a, labelHash) =>
      sha3(a + labelHash, { hexPrefix: false, inputEnc: 'hex' })
    )
  return prefix ? '0x' + address : address
}
