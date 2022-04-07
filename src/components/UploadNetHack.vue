<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <p>Done playing? Save your game and then upload the game state to the server to allow the next streamer to play.</p>
        <v-toolbar dense flat>
          <v-spacer/>
          
          <v-btn
              :loading="uploading"
              :disabled="uploading"
              class="ml-4"
              @click="$emit('upload-nethack')"
          >
            Upload to Server
          </v-btn>
          <v-spacer/>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'UploadNetHack',

  data: () => ({
  }),

  components: {
  },

  props: ['uploading'],

  mounted: function () {
  },

  methods: {
  },
}
</script>

<style>
</style>
