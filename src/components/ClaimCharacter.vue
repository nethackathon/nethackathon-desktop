<template>
  <v-container>
    <v-row>
      <v-col offset="2" cols="8" align="center">
        <v-toolbar dense flat>
          <v-text-field v-model="claimee" label="Username" dense hide-details outlined readonly />
          <v-btn
              class="ml-4"
              @click="$emit('claim-character')"
              :disabled="claimedBy !== null"
          >
            Claim
          </v-btn>
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

  props: ['characterName', 'claimedBy', 'claimee'],

  mounted: function () {
  },

  methods: {
  },
}
</script>

<style>
</style>
