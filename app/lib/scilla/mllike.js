import CodeMirror from 'codemirror'

CodeMirror.defineMode('mllike', (_config, parserConfig) => {
  const words = {
    'scilla_version': 'keyword',
    'import': 'keyword',
    'library': 'keyword',

    'type': 'keyword',

    'contract': 'keyword',
    'transition': 'keyword',

    'Uint32': '',
    'Uint64': 'type',
    'Uint128': 'type',
    'Uint256': 'type',

    'Int32': 'type',
    'Int64': 'type',
    'Int128': 'type',
    'Int256': 'type',

    'BNum': 'type',
    'String': 'type',
    'Address': 'type',
    'ByStr': 'type',
    'Hash': 'type',

    'ByStr20': 'type',
    'ByStr32': 'type',

    'List': 'builtin',
    'Pair': 'builtin',
    'Bool': 'builtin',
    'Option': 'builtin',
    'Nat': 'builtin',
    'with': 'builtin',
    'Nil': 'builtin',
    'field': 'builtin'
  }

  const extraWords = parserConfig.extraWords || {}
  for (const prop in extraWords) {
    if (extraWords.hasOwnProperty(prop)) {
      words[prop] = parserConfig.extraWords[prop]
    }
  }
  const hintWords = []
  for (const k in words) { hintWords.push(k) }
  CodeMirror.registerHelper('hintWords', 'mllike', hintWords)

  function tokenBase (stream, state) {
    const ch = stream.next()

    if (ch === '"') {
      state.tokenize = tokenString
      return state.tokenize(stream, state)
    }
    if (ch === '{') {
      if (stream.eat('|')) {
        state.longString = true
        state.tokenize = tokenLongString
        return state.tokenize(stream, state)
      }
    }
    if (ch === '(') {
      if (stream.eat('*')) {
        state.commentLevel++
        state.tokenize = tokenComment
        return state.tokenize(stream, state)
      }
    }
    if (ch === '~' || ch === '?') {
      stream.eatWhile(/\w/)
      return 'variable-2'
    }
    if (ch === '`') {
      stream.eatWhile(/\w/)
      return 'quote'
    }
    if (ch === '/' && parserConfig.slashComments && stream.eat('/')) {
      stream.skipToEnd()
      return 'comment'
    }
    if (/\d/.test(ch)) {
      if (ch === '0' && stream.eat(/[bB]/)) {
        stream.eatWhile(/[01]/)
      } if (ch === '0' && stream.eat(/[xX]/)) {
        stream.eatWhile(/[0-9a-fA-F]/)
      } if (ch === '0' && stream.eat(/[oO]/)) {
        stream.eatWhile(/[0-7]/)
      } else {
        stream.eatWhile(/[\d_]/)
        if (stream.eat('.')) {
          stream.eatWhile(/[\d]/)
        }
        if (stream.eat(/[eE]/)) {
          stream.eatWhile(/[\d\-+]/)
        }
      }
      return 'number'
    }
    // eslint-disable-next-line no-useless-escape
    if (/[+\-*&%=<>!?|@\.~:]/.test(ch)) {
      return 'operator'
    }
    if (/[\w\xA1-\uFFFF]/.test(ch)) {
      stream.eatWhile(/[\w\xA1-\uFFFF]/)
      const cur = stream.current()
      return words.hasOwnProperty(cur) ? words[cur] : 'variable'
    }
    return null
  }

  function tokenString (stream, state) {
    let next; let end = false; let escaped = false
    while ((next = stream.next()) != null) {
      if (next === '"' && !escaped) {
        end = true
        break
      }
      escaped = !escaped && next === '\\'
    }
    if (end && !escaped) {
      state.tokenize = tokenBase
    }
    return 'string'
  };

  function tokenComment (stream, state) {
    let prev, next
    while (state.commentLevel > 0 && (next = stream.next()) != null) {
      if (prev === '(' && next === '*') { state.commentLevel++ }
      if (prev === '*' && next === ')') { state.commentLevel-- }
      prev = next
    }
    if (state.commentLevel <= 0) {
      state.tokenize = tokenBase
    }
    return 'comment'
  }

  function tokenLongString (stream, state) {
    let prev, next
    while (state.longString && (next = stream.next()) != null) {
      if (prev === '|' && next === '}') { state.longString = false }
      prev = next
    }
    if (!state.longString) {
      state.tokenize = tokenBase
    }
    return 'string'
  }

  return {
    startState () {
      return {
        tokenize: tokenBase,
        commentLevel: 0,
        longString: false
      }
    },
    token (stream, state) {
      if (stream.eatSpace()) {
        return null
      }
      return state.tokenize(stream, state)
    },

    blockCommentStart: '(*',
    blockCommentEnd: '*)',
    lineComment: parserConfig.slashComments ? '//' : null
  }
})

export default CodeMirror
