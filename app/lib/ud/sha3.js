import { sha256 } from 'hash.js'

export default (message, hexPrefix = true, inputEnc = null, outputEnc = 'hex') =>
  (hexPrefix ? '0x' : '') +
  sha256()
    .update(message, inputEnc)
    .digest(outputEnc)
