<template>
  <div class="animate__animated animate__fadeOut" v-if="!profile">
    <div class="loader"></div>
  </div>

  <div class="account Page container-fluid">
    <div
      class="row bg-c5 banner eum-ipsum"
      :style="{ backgroundImage: `url(${profile?.coverImg})` }"
    >
      <div class="col-md-12 d-flex justify-content-center">
        <img
          :src="profile?.picture"
          alt=""
          height="150"
          width="150"
          class="eum rounded-circle mt-2 icon forcedImg"
          v-if="profile?.picture"
        />
      </div>
    </div>

    <div class="row justify-content-center align-items-center p-4"></div>
    <div class="row justify-content-center align-items-center g-2 mt-3 mb-2">
      <div class="col-md"></div>
      <div class="col-md d-flex justify-content-center">
        <h1 class="username">{{ profile?.name }}</h1>
      </div>
      <div class="col-md d-flex justify-content-end">
        <router-link
          :to="{ name: 'Account' }"
          v-if="account?.id == profile?.id"
        >
          <button class="btn rounded-circle editbtn">
            <i
              class="ps-1 mdi mdi-account-cog-outline fs-1"
              alt=""
              title="Edit Profile"
            ></i>
          </button>
        </router-link>
      </div>
    </div>

    <div class="row flex-wrap justify-content-between pt-4 pb-3">
      <!-- <div class="col-md-3  bg-grey  ms-md-3" v-if="account?.id == profile?.id">
        <div class="bg-c3">
          <div class="col-md d-flex justify-content-center pt-2">
            <h2 class="font">Groups</h2>
            <div>
              <i class="mdi mdi-information-outline fs-5" alt=""
                title="Groups only visisble to you, not other users."></i>
            </div>
          </div>
        </div>

        <div class="cardholder">
          <div v-for="g in groups" :key="g.id">
            <GroupCard :group="g" />
          </div>
        </div>
      </div> -->

      <div class="col-md mx-md-3 bg-grey rounded">
      
          <div class="d-flex justify-content-center pt-2 bg-c3 rounded elevation-4">
            <h2 class="font">Game Lists</h2>
          </div>

        <div class="row justify-content-center">
          <b class="mb-2 mt-2 d-flex justify-content-center">
            <div class="ms-3">
              <input
                type="button"
                id="Fave"
                name="Fave"
                value="Favorites"
                autofocus="true"
                class="button-50 py-2 filterbtn focus"
                @click="filterBg = 'favorite'"
              />
            </div>
            <div class="ms-3">
              <input
                type="button"
                class="button-50 py-2 filterbtn"
                id="Owned"
                name="Owned"
                value="Owned"
                @click="filterBg = 'owned'"
              />
            </div>
            <div class="ms-3">
              <input
                type="button"
                id="Wishlist"
                name="Wishlist"
                class="button-50 py-2 filterbtn"
                value="Wishlist"
                @click="filterBg = 'wish'"
              />
            </div>
          </b>
        </div>

        <div class="cardholder">
          <div class="row">
            <div class="col-md-4 px-4" v-for="g in bgLists" :key="g.id">
              <GroupGamesCard :boardGameList="g" class="elevation-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop.js";
import GroupCard from "../components/GroupPage/GroupCard.vue";
import GroupForm from "../components/GroupPage/GroupForm.vue";
import ListCard from "../components/AccountProfilePage/ListCard.vue";
import GroupGamesCard from "../components/GroupPage/GroupGamesCard.vue";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService.js";
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const filterBg = ref("favorite");
    const route = useRoute();
    const editable = ref("");
    async function getProfileGroups() {
      try {
        await profilesService.getProfileGroups(route.params.id);
      } catch (error) {
        Pop.error(error, "[getMyGroups]");
      }
    }
    async function getProfileLists() {
      try {
        await profilesService.getProfileLists(route.params.id);
      } catch (error) {
        logger.error("[get my lists]", error);
        Pop.error(error);
      }
    }
    async function getUserProfile() {
      try {
        await profilesService.getUserProfile(route.params.id);
      } catch (error) {
        Pop.error(error, "[getProfile]");
      }
    }
    function focus() {
      document.getElementById("Fave").focus();
    }
    onMounted(() => {
      getUserProfile();
      getProfileGroups();
      getProfileLists();
      focus();
    });
    return {
      filterBg,
      editable,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      groups: computed(() => AppState.groupMemberShips),
      // bgLists: computed(() => AppState.bgLists),
      wishList: computed(() =>
        AppState.bgLists.filter((w) => w.listName == "wish")
      ),
      favList: computed(() =>
        AppState.bgLists.filter((f) => f.listName == "favorite")
      ),
      ownedList: computed(() =>
        AppState.bgLists.filter((o) => o.listName == "owned")
      ),
      profile: computed(() => AppState.activeProfile),

      bgLists: computed(() =>
        AppState.bgLists.filter((b) =>
          filterBg.value ? b.listName == filterBg.value : true
        )
      ),



      
    };
  },
  components: { GroupCard, GroupForm, ListCard, GroupGamesCard },
};
</script>

<style scoped>
.banner {
  min-height: 220px;
  background-size: cover;
  background-position: center center;
  /* background-image: url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80); */
}

.forcedImg {
  height: 150px;
  width: 150px;
  object-fit: cover;
}

.icon {
  border: 3px solid white;
}

.eum-ipsum {
  position: relative;
}

.eum {
  position: absolute;
  bottom: -35%;
}

.username {
  font-size: 3rem;
  font-family: "Baloo 2", cursive;
  font-weight: 600;
}

.font {
  font-family: "Baloo 2", cursive;
  font-weight: 700;
  color: aliceblue;
  text-shadow: 2px 2px #3b8686, 0px 0px 5px #79bd9a;
}

.cardholder {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.editbtn {
  background: linear-gradient(to bottom right, #ff6f00, #ff9900);
}

.editbtn:hover {
  color: white !important;
  transform: scale(1.09);
  filter: brightness(110%);
  filter: contrast(110%);
  transition: 0.75s ease;
}

.filterbtn:focus {
  background: linear-gradient(to bottom right, #ffbb00, #ff5e00);
  border: 0;
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Baloo 2", cursive;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.07em;
  line-height: 2.5;
  outline: transparent;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
}

@media (max-width: 576px) {
  .username {
    font-size: 1.5rem;
  }
}
</style>
