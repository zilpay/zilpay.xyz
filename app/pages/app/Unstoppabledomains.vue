<template>
  <div :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        {{ app.title }}
      </h1>
      <h2 :class="b('sub-title')">
        Buy .zil domains for $10
      </h2>
      <SearchInput
        v-model="domain"
        :class="b('search-input')"
        @click="domainSubmit"
      />
      <DomainView
        v-if="domainInfo && domain"
        :class="b('domain-view')"
        :info="domainInfo"
        :domain="domain"
      />
    </div>
  </div>
</template>

<script>
import DApps from '../../static/dapps.json'

import SearchInput from '../../components/Search'
import DomainView from '../../views/unstoppabledomains/DomainView'

const UD_API = 'https://unstoppabledomains.com/api/v1/'
const DEFAULT_ZONE = 'zil'

export default {
  name: 'Unstoppabledomains',
  components: {
    SearchInput,
    DomainView
  },
  data () {
    return {
      domain: '',
      domainInfo: null
    }
  },
  computed: {
    app () {
      const name = this.$options.name.toLowerCase()
      return DApps.find(app => app.link === name)
    }
  },
  methods: {
    async domainSubmit () {
      this.$nuxt.$loading.start()
      const zone = this.domain.substr(this.domain.length - 4)
      if (zone !== `.${DEFAULT_ZONE}`) {
        this.domain += `.${DEFAULT_ZONE}`
      }
      this.domainInfo = await this.getAddress()
      this.$nuxt.$loading.finish()
    },
    async getAddress () {
      try {
        return await this.$axios.$get(UD_API + this.domain)
      } catch (err) {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.Unstoppabledomains {
  height: 100vh;
  background-color: $background;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding-top: 120px;
  }

  &__title {
    font-size: $xl-font;
    line-height: 1;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__sub-title {
    padding-top: 10px;
    font-weight: 400;
    line-height: 1.33;
  }

  &__search-input,
  &__domain-view {
    margin-top: 40px;
  }
}
</style>
