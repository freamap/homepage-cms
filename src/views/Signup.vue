<template>
  <div class="signin">
    <input type="text" v-model="userName">
    <input type="text" v-model="password">
    <input type="text" v-model="email">
    <button class="button is-primary" @click="clickSignup">サインアップ</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/auth';

@Component({
  methods: {
    ...mapActions(['signupAction'])
  }
})
export default class Signup extends Vue {
  userName: string = '';
  password: string = '';
  email: string = '';
  signupAction!: (payload: Actions["signupAction"]) => void;

  clickSignup() {
    this.signupAction({
      userName: this.userName,
      password: this.password,
      email: this.email
    })
  }
}
</script>
