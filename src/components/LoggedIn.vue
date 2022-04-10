<template>
  <div class="logged-in">
    <p>Logged in as {{claimee}}</p>
  </div>
</template>

<script>
export default {
  name: 'LoggedIn',

  data: () => ({
  }),

  components: {
  },

  props: ['claimee'],

  mounted: function () {
  },

  methods: {
  },
}
</script>

<style>
.logged-in {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
}
</style>
