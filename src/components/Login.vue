<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <button class="ml-4 twitch-login" @click="login"> Login with Twitch </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
  }),

  components: {
  },

  props: [],

  mounted: function () {
  },

  methods: {
    login: function() {
      const uri = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/twitch/electron' : 'https://api.nethackathon.org/twitch/electron'
      console.log('uri', uri)
      location.href = uri
    }
  },
}
</script>

<style>
.twitch-login {
  display: inline-flex;
  background-color: rgb(145, 71, 255);
  color: white !important;
  border-radius: 4px;
  font-size: 13pt;
  padding: .5em;
  margin: .5em;
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-stretch: 100%;
}
</style>
