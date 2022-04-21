<template>
  <select v-model="selectedId" class="v-custom-select" @change="CHOOSE_BANK(selectedId)">
    <option disabled :value="null" class="v-custom-select_options">Choose from dropdown</option>
    <option
      v-for="bank in banks"
      :key="bank.id"
      class="v-custom-select_option"
      :value="bank.id"
    >
      {{ bank.title }}
    </option>
  </select>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: "v-custom-select",
  data() {
    return {
      selectedId: null,
    };
  },
  computed: {
    ...mapState(['banks']),
  },
  methods: {
    ...mapMutations(['CHOOSE_BANK']),
  }
};
</script>

<style lang="scss" scoped>
.v-custom-select {
  border: 1px solid green;
  padding: 9px;
  border-radius: 15px;
}
</style>
