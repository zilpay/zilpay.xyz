<template>
  <div>
    <Nav :links="navLinks" />
    <nuxt />
  </div>
</template>

<script>
import uuidv4 from 'uuidv4'
import Nav from '../components/Nav'

const ROUTERS = {
  Home: 'Home',
  Privacy: 'Privacy',
  Terms: 'Terms',
  Doc: 'Documentation'
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
          uuidv4: uuidv4(),
          name: ROUTERS.Home,
          href: '',
          external: false
        },
        {
          uuidv4: uuidv4(),
          name: ROUTERS.Privacy,
          href: ROUTERS.Privacy,
          external: false
        },
        {
          uuidv4: uuidv4(),
          name: ROUTERS.Terms,
          href: ROUTERS.Terms,
          external: false
        },
        {
          uuidv4: uuidv4(),
          name: ROUTERS.Doc,
          href: ROUTERS.Doc,
          external: true
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
