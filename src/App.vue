<template>
  <v-app>
    <v-main>
      <CharacterStatus :character-name="characterName" :claimed-by="claimedBy" :loading="loading" />
      <ClaimCharacter
          :claimee="claimee"
          :claimed-by="claimedBy"
          v-if="!loading && claimee !== null && claimedBy === null"
          @claim-character="claimCharacter"
      />
      <Login v-if="claimee === null" @login="login"/>
      <NetHackLauncher v-if="claimedBy === claimee"/>
    </v-main>
    <v-snackbar v-model="loggedOut" color="warning">You have been logged out.</v-snackbar>
  </v-app>
</template>

<script>
import CharacterStatus from "./components/CharacterStatus";
import NetHackLauncher from "./components/NetHackLauncher";
import ClaimCharacter from "./components/ClaimCharacter";
import Login from "./components/Login"
import {get, claimCharacter, getCharacterStatus} from "./services/services";

export default {
  name: 'App',

  components: {
    CharacterStatus,
    ClaimCharacter,
    NetHackLauncher,
    Login
  },
  
  mounted: function () {
    get().then((response) => {
      this.claimee = response.data.claimee
    })
    getCharacterStatus(this.characterName).then((response) => {
      this.claimedBy = response.data.claimedBy
    }).finally(() => this.loading = false)
  },

  data: () => ({
    loading: true,
    characterName: 'NetHackathon',
    twitchAccessToken: null,
    claimedBy: null,
    claimee: null,
    loggedOut: false
  }),
  
  methods: {
    login: function(username) {
      this.claimee = username
    },
    claimCharacter: function() {
      claimCharacter({accessToken: this.twitchAccessToken, characterName: this.characterName}).then((response) => {
        if (! response.data.claimSuccessful) {
          this.error = true
          this.errorMessage = `The character ${this.characterName} has already been claimed by ${response.data.claimedBy}.`
          this.claimedBy = response.data.claimedBy
          setTimeout(() => this.error = false, 2500)
        } else {
          this.claimedBy = this.claimee
        }
      }).catch(() => {
        // Logged out
        this.claimee = null
        this.loggedOut = true
      })
    }
  }
};
</script>
