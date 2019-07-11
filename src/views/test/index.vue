<template>
  <div>
    <p>test</p>

    <input v-validate="'required|email'"
           name="email"
           type="text">
    <span>{{ errors.first('email') }}</span>

  </div>
</template>
<script>
export default {
  data () {
    return {
      username: ''
    }
  }
}
</script>
<style>
</style>
