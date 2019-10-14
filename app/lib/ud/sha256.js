import { sha256 } from 'hash.js'

export default (message, inputEnc = null, outputEnc = 'hex') =>
  sha256()
    .update(message, inputEnc)
    .digest(outputEnc)
