<template>
  <v-container>
    <v-row>
      <v-col v-if="loading">
        <h2>Loading</h2>
      </v-col>
      <v-col offset="2" cols="8" v-if="!loading" align="center">
        <p>Sir {{ characterName }} {{ (claimedBy === null) ? 'is available to play' : `has been claimed by ${claimedBy}` }}.</p>
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

  props: ['characterName', 'claimedBy', 'loading'],

  methods: {
  },
}
</script>

<style>
</style>
