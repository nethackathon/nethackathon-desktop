<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div v-if="claimee === null">
              <Login @login="login" />
            </div>
            <div v-if="claimee !== null">
              <CharacterStatus
                  :character-name="characterName"
                  :claimed-by="claimedBy"
                  :loading="loading"
                  :claimee="claimee"
              />
              <ClaimCharacter
                  :claimee="claimee"
                  :claimed-by="claimedBy"
                  v-if="!loading && claimee !== null && claimedBy === null"
                  @claim-character="claimCharacter"
              />
              <NetHackLauncher v-if="claimedBy === null"/>
              <UploadNetHack @upload-nethack="uploadNetHack" :uploading="uploading"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
import UploadNetHack from "./components/UploadNetHack";


export default {
  name: 'App',

  components: {
    UploadNetHack,
    CharacterStatus,
    ClaimCharacter,
    NetHackLauncher,
    Login
  },
  
  mounted: function () {
    this.$vuetify.theme.dark = true
    get().then((response) => {
      this.claimee = response.data.claimee
      this.accessToken = response.data.accessToken
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
    loggedOut: false,
    uploading: false,
    errMessage: '',
    accessToken: ''
  }),
  
  methods: {
    uploadNetHack: async function() {
      try {
        this.uploading = true
        const response = await window.ipcRenderer.invoke('upload-nethack-zip', {
          accessToken: this.accessToken
        })
        console.log('response', response)
      } catch (err) {
        console.error(err)
        this.errMessage = err.message
        this.uploading = false
        this.logout()
      } finally {
        this.uploading = false
      }
    },
    login: function(username) {
      this.claimee = username
    },
    logout: function() {
      this.claimee = null
      this.loggedOut = true
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
        this.logout()
      })
    }
  }
};
</script>

<style>
</style>