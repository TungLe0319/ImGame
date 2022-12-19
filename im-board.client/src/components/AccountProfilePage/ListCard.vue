<template>
  <div class="hi">
    <div class="card elevation-4 my-2">
      <router-link class="text-center" :to="{ name: 'BoardGameDetails', params: { id: boardGameList?.gameId } }">
        <img :src="boardGameList.imgUrl" class="forcedImg rounded img-fluid" />
      </router-link>
      <div class="card-body p-1 bg-dark rounded-bottom">
        <p class="card-title d-flex justify-content-center">
        <h4>{{boardGameList?.boardGameName}}</h4>
        </p>
        <div class="card-text d-flex justify-content-center">
          Categories:
        </div>
        <div class="card-text d-flex justify-content-center">
          Players: {{boardGameList.players}}
        </div>
        <div class="card-text d-flex justify-content-center">
          Rating:{{boardGameList.rating.toFixed(2)}}
        </div>

        <div v-if="route.name == 'Account'">

          <i class="mdi mdi-close text-danger selectable rounded-3 fs-3" title="remove game from list"
            @click="removeGameFromList()" v-if="account.id == boardGameList.accountId"></i>
        </div>



      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../../AppState.js"
import { BGList } from "../../models/BoardGame/BGList.js"
import { listsService } from "../../services/ListsService.js"
import { logger } from "../../utils/Logger.js"
import Pop from "../../utils/Pop.js"

export default {
  props: {
    boardGameList: {
      type: BGList,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      route,
      // routeAccount: computed(() => route.name == "account"),
      async removeGameFromList() {
        try {
          const yes = await Pop.confirm('remove from this list?')
          if (!yes) { return }
          // console.log(props.boardGameList.gameId, props.boardGameList.listId);
          await listsService.removeGameFromList(props.boardGameList.listId)
        } catch (error) {
         logger.error('[RemoveGame]', error)
          Pop.error(error)
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem;
  /* Second Color  in text-shadow is the blur */
}

.forcedImg {
  height: 170px;
  width: auto;
  object-fit: contain;
}

.card {
  border: none;

}

.hi {
  margin-bottom: 25px;
}
</style>