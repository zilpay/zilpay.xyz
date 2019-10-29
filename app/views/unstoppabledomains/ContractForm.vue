<template>
  <div>
    <tabs>
      <tab name="Transfer">
        <Transfer
          :domain="domain"
          @transfer="$emit('transfer', $event)"
        />
      </tab>
      <tab name="Assign">
        <Assign
          :domain="domain"
          @assign="$emit('assign', $event)"
        />
      </tab>
      <tab name="Approve">
        <Approve
          :domain="domain"
          @approve="$emit('approve', $event)"
        />
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component'

import TYPES from '../../static/types.json'

import Transfer from './forms/Transfer'
import Assign from './forms/Assign'
import Approve from './forms/Approve'

export default {
  name: 'ContractForm',
  components: {
    Tabs,
    Tab,
    Transfer,
    Assign,
    Approve
  },
  props: {
    domain: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      types: TYPES
    }
  }
}
</script>

<style lang="scss">
.tabs-component {
  margin: 0;
  min-width: 400px;
}

.tabs-component-tabs {
  border: solid 1px $primary;
  border-radius: 6px;
  margin-bottom: 5px;
}

.tabs-component-tabs {
  border: 0;
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  margin-bottom: -1px;
}

.tabs-component-tab {
  color: $white;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: none;
}

.tabs-component-tab:hover {
  color: darken($white, 3%);
}

.tabs-component-tab.is-active {
  color: $white;
  border: solid 1px darken($warning, 50%);
}

.tabs-component-tab.is-disabled * {
  color: $info;
  border-bottom: none;
  cursor: not-allowed !important;
}

.tabs-component-tab {
  background-color: $background;
  border: solid 1px darken($background, 3%);
  border-radius: 3px 3px 0 0;
  margin-right: .5em;
  transform: translateY(2px);
  transition: transform .3s ease;
}

.tabs-component-tab.is-active {
  background-color: $warning;
  border-bottom: solid 1px $warning;
  z-index: 2;
  transform: translateY(0);
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 2em 0;
}

.tabs-component-panels {
  border-top-left-radius: 0;
  background-color: $background;
  border: solid 1px darken($background, 3%);
  border-radius: 0 6px 6px 6px;
  padding: 1em 2em;

  @include box-shadow(0 1rem 3rem rgba(0,0,0,.175));
}
</style>
