<template>
  <form @submit.prevent="getBoardGamesByQuery()">
    <div class="d-flex">
      <input
        v-model="editable"
        type="text"
        class="form-control phtext"
        placeholder="Search for board game . . ."
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <button
        class="btn button-50 py-1 px-2 mx-2"
        type="submit"
        id="button-addon2"
      >
        <i class="mdi mdi-magnify mx-2" alt="" title="search By Name"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { atlasGamesService } from "../../services/AtlasGamesService.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";

export default {
  setup() {
    const editable = ref("");

    return {
      editable,
      async getBoardGamesByQuery() {
        try {
          await atlasGamesService.getBoardGamesByQuery(editable.value);
          editable.value = "";
        } catch (error) {
          logger.error("dfd", error);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.phtext {
  font-size: 12px;
}
</style>
