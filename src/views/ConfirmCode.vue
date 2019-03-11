<template>
  <div class="signin">
    <input type="text" v-model="userName">
    <input type="text" v-model="code">
    <button class="button is-primary" @click="clickSignUp">コード確認</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/auth';

@Component({
  methods: {
    ...mapActions(['confirmCodeAction'])
  }
})
export default class ConfirmCode extends Vue {
  userName: string = '';
  code: string = '';
  confirmCodeAction!: (payload: Actions["confirmCodeAction"]) => void;

  clickSignUp() {
    this.confirmCodeAction({
      userName: this.userName,
      code: this.code
    })
  }
}
</script>
