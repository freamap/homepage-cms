<template>
  <div class="signin">
    <button class="button is-primary" @click="clickSignup">サインアウト</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/auth';

@Component({
  methods: {
    ...mapActions(['signoutAction'])
  }
})
export default class Signout extends Vue {
  signoutAction!: (payload: Actions["signoutAction"]) => void;

  clickSignup() {
    this.signoutAction({})
  }
}
</script>
