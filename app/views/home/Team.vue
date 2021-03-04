<template>
  <section :class="b()">
    <div :class="b('container')">
      <h1 :class="b('title')">
        The Team
      </h1>
      <ul :class="b('items')">
        <li :class="b('item')">
          <img src="/img/Rinat.png">
          <h2 :class="b('item-title')">
            Rinat Hasanshin
          </h2>
          <p>
            Co-founder & CEO.
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Team'
}
</script>

<style lang="scss">
.Team {
  &__container {
    padding: 50px;

    display: flex;
    flex-direction: column;

    text-align: center;
  }

  &__item {
    display: flex;
    flex-direction: column;

    & > img {
      height: 200px;
      width: 200px;
      border-radius: 100%;
    }

    & > p {
      color: $primary;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__item-title {
    color: $grey-darker;

    @include mobile {
      font-size: $md-font;
    }
  }

  &__title {
    font-size: $xll-font;
    color: $grey-darker;

    @include mobile {
      font-size: $md-font;
    }
  }
}
</style>
