const agents = {
  firefox: 'Firefox',
  chrome: 'Chrome'
}
const urlsStore = {
  [agents.firefox]: 'https://addons.mozilla.org/en-GB/firefox/addon/zilpay/',
  [agents.chrome]: 'https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd'
}

function detectAgent () {
  if (process.client) {
    if (navigator.userAgent.includes(agents.firefox)) {
      return agents.firefox
    } else if (navigator.userAgent.includes(agents.chrome)) {
      return agents.chrome
    } else {
      return agents.chrome
    }
  }
}

export default {
  data () {
    return {
      agents,
      urlsStore
    }
  },
  methods: {
    detectMixin () {
      return detectAgent()
    }
  }
}
