<template>
  <div class="dashboard">
    ログイン後のページです。
    <div v-for="page in pages" :key="page.title">
      {{ page.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, Actions } from '@/store/modules/pages';
import { Getter } from 'vuex-class';
import Page from '@/types/Page';

@Component({
  methods: {
    ...mapActions(['getPagesAction'])
  }
})
export default class DashBoard extends Vue {
  @Getter('pages/pages') pages!: Page[];
  getPagesAction!: () => void;

  created() {
    this.getPagesAction();
  }
}
</script>
