<template>
  <div>
    <Nav :links="navLinks" />
    <nuxt />
  </div>
</template>

<script>
import { uuid } from 'uuidv4'
import Nav from '../views/common/Nav'

const ROUTERS = {
  Home: 'Home',
  Apps: 'Apps',
  Privacy: 'Privacy',
  Terms: 'Terms',
  Doc: 'Documentation',
  whitePaper: 'whitePaper'
}

export default {
  name: 'DefaultLayouts',
  components: {
    Nav
  },
  data () {
    return {
      navLinks: [
        {
          uuidv4: uuid(),
          name: ROUTERS.Apps,
          href: ROUTERS.Apps,
          external: false
        },
        {
          uuidv4: uuid(),
          name: ROUTERS.Home,
          href: '',
          external: false
        },
        {
          uuidv4: uuid(),
          name: ROUTERS.Privacy,
          href: ROUTERS.Privacy,
          external: false
        },
        {
          uuidv4: uuid(),
          name: ROUTERS.Terms,
          href: ROUTERS.Terms,
          external: false
        },
        {
          uuidv4: uuid(),
          name: ROUTERS.Doc,
          href: `/${ROUTERS.Doc}`,
          external: true
        },
        {
          uuidv4: uuid(),
          name: ROUTERS.whitePaper,
          href: `/${ROUTERS.whitePaper}.pdf`,
          external: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
