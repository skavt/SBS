<template>
  <ValidationObserver v-if="!loading" v-slot="{ handleSubmit }">
    <b-form @keydown.enter.prevent="handleSubmit(onSubmit)">
      <input-widget :model="model" attribute="email" :autofocus="true" :label="false"/>
      <input-widget :model="model" attribute="password" type="password" :label="false"/>
      <div class="d-flex align-items-center justify-content-between">
        <b-button class="mr-2" variant="outline-light" @click="handleSubmit(onSubmit)">Login</b-button>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script>
import InputWidget from "../../../core/components/input-widget/InputWidget";

export default {
  name: "AuthForm",
  components: {InputWidget},
  props: {
    model: Object,
    loading: Boolean,
    formType: String,
  },
  methods: {
    onSubmit() {
      this.$emit('on-login-click')
    },
  },
}
</script>

<style scoped>

</style>