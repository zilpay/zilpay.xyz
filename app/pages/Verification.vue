<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <textarea
        v-model="message"
        :class="b('editor')"
        :placeholder="placeholder"
        @input="error = ''"
      />
      <Button
        :class="b('button')"
        lg
        @click="verify"
      >
        Verify Message 
      </Button>
    </div>
    <Modal
      :name="modalResult.name"
      :title="modalResult.title"
    >
      <div :class="b('modal-content')">
        <tree-view
          :data="msgData"
          :options="initOptions"
        />
      </div>
    </Modal>
    <Modal
      :name="modalError.name"
      :title="modalError.title"
    >
      <h2 :class="b('error')">
        {{ error }}
      </h2>
    </Modal>
  </div>
</template>

<script>
  
import { sha256 } from 'js-sha256'
import { schnorr } from '@zilliqa-js/crypto'

import Button from '@/components/Button'
import Modal from '@/components/Modal'

function verifySignature(
  message,
  publicKey,
  signature
) {
  const hashStr = sha256(message);
  const bytecSignature = schnorr.toSignature(signature);
  const hashBytes = Buffer.from(hashStr, 'hex');

  return schnorr.verify(
    hashBytes,
    bytecSignature,
    Buffer.from(publicKey, 'hex')
  );
}

export default {
  name: 'Verification',
  components: {
    Button,
    Modal
  },
  data() {
    return {
      modalResult: {
        name: 'verification',
        title: 'Signature verification successfully'
      },
      modalError: {
        name: 'verification-error',
        title: 'Signature verification reject'
      },
      initOptions: {
        rootObjectKey: 'transaction'
      },
      message: '',
      msgData: {},
      error: 'dasdsa',
      placeholder: `{
    "publicKey": "02f006b10b35ed60ac7cb79866b228a048b7d820561ec917b1ad3d2e5a851cedb9",
    "signature": "ec6abf2e60ce8e8ec628ca2623bb637a00c784442409965f45b37ba890b7fb9b74463bdcdf0ab82f8d6cd047845d660ab21148323abd6655cd6ada318f6b5aba",
    "message": "ZilPay the best wallet"
}`
    }
  },
  methods: {
    verify() {
      if (!this.message) {
        return null
      }

      try {
        const msg = JSON.parse(this.message)

        if (!msg || !msg.publicKey || !msg.signature || !msg.message) {
          throw new Error('Incorect message format.');
        }

        const verify = verifySignature(msg.message, msg.publicKey, msg.signature)

        if (!verify) {
          throw new Error('Bad signature')
        }
        
        this.msgData = msg;

        this.$modal.show(this.modalResult.name)
      } catch (err) {
        if (err.message === 'Unexpected token d in JSON at position 0') {
          this.error = 'Incorect message format.'
          this.$modal.show(this.modalError.name)
          return null
        }

        this.error = err.message
        this.$modal.show(this.modalError.name)
      }
    }
  }
}
</script>

<style lang="scss">
.Verification {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;

  &__wrapper {
    width: 100%;
    max-width: 1024px;
    padding-left: 30px;
    padding-right: 30px;
  }

  &__error {
    text-align: center;
    color: $danger;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  &__button > .Button {
    width: 100%;
  }

  &__editor {
    background: $grey-darkest;

    height: auto;
    width: 100%;
    border: 1px solid $grey-darkest;
    color: $white;
    border-radius: 2px;
    height: 3rem;
    padding: .75rem 1rem;
    font-weight: 400;
    box-shadow: inset 0 1px 0 0 rgba(63,63,68,.05);
    transition: border-color .12s, box-shadow .12s;
    margin-bottom: 1rem;
    min-height: 140px;
  }
  &__editor[placeholder] {
    text-overflow: ellipsis;
  }
  &__editor:not([disabled]):not([readonly]):focus {
    border-color: $grey-darkest;
    box-shadow: inset 0 0 0 1px $grey-darkest;
  }
}
</style>