<template>
  <div class="signin-mfa">
    <input type="text" v-model="code">
    <button class="button is-primary" @click="clickSignip">MFAコード確認</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/auth';

@Component({
  methods: {
    ...mapActions(['signinMfaAction'])
  }
})
export default class Signin extends Vue {
  code: string = '';

  signinMfaAction!: (payload: Actions["signinMfaAction"]) => void;

  clickSignip() {
    this.signinMfaAction({
      code: this.code
    })
  }
}
</script>
