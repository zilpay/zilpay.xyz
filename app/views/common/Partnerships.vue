<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        Partnerships & Collaborations
      </h1>
      <ul :class="b('items')">
        <li :class="b('item')">
          <a
            href="https://www.zilliqa.com/"
            target="_blank"
          >
            <img
              src="/icons/zil.svg"
              height="100"
            >
          </a>
        </li>
        <li :class="b('item')">
          <a
            href="https://zillet.io/"
            target="_blank"
          >
            <img
              src="/icons/zillet.png"
              height="100"
            >
          </a>
        </li>
        <li :class="b('item')">
          <a
            href="https://unstoppabledomains.com/"
            target="_blank"
          >
            <img
              src="/icons/ud.svg"
              height="100"
            >
          </a>
        </li>
        <li :class="b('item')">
          <a
            href="https://dragonzil.xyz/"
            target="_blank"
          >
            <img
              src="/icons/dragonzil.png"
              height="100"
            >
          </a>
        </li>
        <li :class="b('item')">
          <a
            href="https://switcheo.network/"
            target="_blank"
          >
            <img
              src="/icons/ZWAP.svg"
              height="100"
            >
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Partnerships'
}
</script>

<style lang="scss">
.Partnerships {
  background-color: $background;

  &__title {
    font-size: $xll-font;
    color: $grey-darker;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
  }

  &__item {
    margin: 30px;
  }

  &__container {
    padding: 50px 50px 0 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;
  }
}
</style>
