<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <v-toolbar dense flat>
          <v-btn
              class="ml-4"
              @click="launchNetHack"
          >
            Launch
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'CharacterStatus',

  data: () => ({
  }),

  components: {
  },

  props: [],

  mounted: function () {
  },

  methods: {
    launchNetHack: function() {
      window.ipcRenderer.send('launch-nethack')
    }
  },
}
</script>

<style>
</style>
