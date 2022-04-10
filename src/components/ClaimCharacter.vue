<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <v-toolbar dense flat>
          <v-spacer/>
          <v-btn
              @click="$emit('claim-character')"
              :disabled="downloading || claimedBy !== null"
              :loading="downloading"
          >
            Download save
          </v-btn>
          <v-spacer/>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row v-if="error">
      <v-col offset="2" cols="8" align="center">
        <span class="error--text">{{ errorMessage }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'ClaimCharacter',

  data: () => ({
    loading: true,
    error: false,
    errorMessage: ''
  }),

  components: {
  },

  props: ['characterName', 'claimedBy', 'claimee', 'downloading'],

  mounted: function () {
  },

  methods: {
  },
}
</script>

<style>
</style>
