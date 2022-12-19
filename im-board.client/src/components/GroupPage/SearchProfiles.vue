<template>
  <form>
    <div class="d-flex">
      <input v-model="editable.term" type="text" class="form-control phtext" placeholder="Search Users By Name . . ."
        aria-label="Search" aria-describedby="button-addon2" @keyup.prevent="searchProfiles()" />
      <button class="btn button-50 py-1 px-2 mx-2" type="submit" id="button-addon2">
        <i class="mdi mdi-magnify mx-2" alt="" title="search By Name"></i>
      </button>
    </div>
    <div class=" row  justify-content-center ">
      <div class="col-md-4 my-2  animate__animated animate__fadeIn " v-for="p in profiles" @click="inviteToGroup(p)">
        <div class="d-flex align-items-center bg-dark rounded p-2 hover hoverable">
          <img :src="p.picture" alt="" height="30" width="30" class="rounded-circle me-3">
          <p class="mb-0 text-truncate">
            {{ p.name.split('@')[0] }}
          </p>
        </div>

      </div>

    </div>
  </form>
</template>

<script>
import { onMounted, ref } from 'vue';
import { atlasGamesService } from '../../services/AtlasGamesService.js';
import { profilesService } from '../../services/ProfilesService.js';
import Pop from '../../utils/Pop.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../../AppState.js';
import { logger } from "../../utils/Logger.js";
export default {
  setup() {

    const editable = ref({});

    return {
      editable,
      profiles: computed(() => AppState.profiles.filter(p => p.name.toUpperCase().includes(editable.value.term.toUpperCase()))),
      async searchProfiles() {
        try {

          await profilesService.getProfiles(editable.value.term);
        } catch (error) {
          logger.error('searchProfiles', error);
        }
      },


      async inviteToGroup(profile) {
        AppState.profileIdToInviteBy = profile

        // console.log(AppState.profileIdToInviteBy);
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.phtext {
  font-size: 12px;
}
</style>
