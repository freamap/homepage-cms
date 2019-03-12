<template>
  <div class="signin">
    <input type="text" v-model="userName">
    <input type="text" v-model="password">
    <button class="button is-primary" @click="clickSignip">ログイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/auth';

@Component({
  methods: {
    ...mapActions(['signinAction'])
  }
})
export default class Signin extends Vue {
  userName: string = '';
  password: string = '';

  signinAction!: (payload: Actions["signinAction"]) => void;

  clickSignip() {
    this.signinAction({
      userName: this.userName,
      password: this.password,
    })
  }
}
</script>
