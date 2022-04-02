<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <v-toolbar dense flat>
          <v-btn
              class="ml-4"
              @click="login"
          >
            Login with Twitch
          </v-btn>
        </v-toolbar>
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
</style>
