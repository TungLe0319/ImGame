<template>
  <!-- TEST PUTTING COMMENT TUNG -->
  <div class="animate__animated animate__fadeOut" v-if="!account">
    <div class="loader"></div>
  </div>

  <div class="account Page container-fluid" v-else>
    <div class="row bg-c5 banner eum-ipsum" :style="{ backgroundImage: `url(${account.coverImg})` }">
      <div class="col-md-12 d-flex justify-content-center">
        <img v-if="account?.picture" :src="account?.picture" alt="" height="150" width="150"
          class="eum rounded-circle mt-2 icon forcedImg" />
      </div>
    </div>

    <div class="row justify-content-center align-items-center p-4">
      <!-- <div class="d-flex justify-content-center editprofilebutton"><button class="btn bg-c6 rounded-circle"></button></div> -->
    </div>
    <div class="row justify-content-center align-items-center g-2 mt-3 mb-2">
      <div class="col-md"></div>
      <div class="col-md d-flex justify-content-center">
        <h1 class="username">
          {{ account.name }}
        </h1>
      </div>
      <div class="col-md d-flex justify-content-end">
        <button class="btn" data-bs-toggle="modal" data-bs-target="#editBanner">
          <i class="mdi mdi-circle-edit-outline fs-3 rounded-circle editbtn ps-2 pe-2 py-1" alt=""
            title="Edit Account"></i>
        </button>
        <!-- <router-link :to="{ name: 'Profile', params: { id: user.id } }">
          <button class="btn rounded-circle editbtn">
            <i class="ps-1 mdi mdi-account-check-outline fs-1" alt="" title="Profile Page"></i>
          </button>
        </router-link> -->
      </div>
    </div>
    <div class="row flex-wrap justify-content-between pt-4 pb-3">
      <div class="col-md-3 ms-md-3 bg-grey rounded px-0">
        <div class="bg-c3 rounded elevation-3">
          <div class="col-md d-flex justify-content-center pt-2 ">
            <h2 class="font">Groups</h2>
            <div>
              <i class="mdi mdi-information-outline fs-5" alt=""
                title="Groups only visible to you, not other users."></i>
            </div>
          </div>
        </div>

        <div class="cardholder ">
          <div v-for="g in groups" :key="g.id">
            <GroupCard :group="g" />
          </div>
        </div>
      </div>

      <div class="col-md mx-md-3 mt-3 mt-md-0 rounded bg-grey px-0">
        <div class="col-md d-flex justify-content-center pt-2 rounded bg-c3 elevation-3">
          <h2 class="font">Game Lists</h2>
        </div>

        <div class="row justify-content-center">
          <b class="mb-2 mt-2 d-flex justify-content-center">
            <div class="ms-3">
              <input type="button" autofocus="true" class="button-50 py-2 filterbtn focus" id="Fave" name="Fave"
                value="Favorites" @click="filterBg = 'favorite'" />
              <!-- <label for="vehicle1" class="ms-1">Fave</label> -->
            </div>
            <div class="ms-3">
              <input type="button" class="button-50 py-2 filterbtn" id="Owned" name="Owned" value="Owned"
                @click="filterBg = 'owned'" />
              <!-- <label for="vehicle3" class="ms-1">Owned</label> -->
            </div>
            <div class="ms-3">
              <input type="button" class="button-50 py-2 filterbtn" id="Wishlist" name="Wishlist" value="Wishlist"
                @click="filterBg = 'wish'" />
              <!-- <label for="vehicle2" class="ms-1">Wishlist</label> -->
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
import { accountService } from "../services/AccountService.js";

import Pop from "../utils/Pop.js";
import GroupCard from "../components/GroupPage/GroupCard.vue";
import GroupForm from "../components/GroupPage/GroupForm.vue";
import ListCard from "../components/AccountProfilePage/ListCard.vue";
import GroupGamesCard from "../components/GroupPage/GroupGamesCard.vue";
import EditBanner from "../components/AccountProfilePage/EditAccountModal.vue";

import EditName from "../components/AccountProfilePage/EditName.vue";
import EditPic from "../components/AccountProfilePage/EditPic.vue";
import InviteLink from "../components/socketStuff/InviteLink.vue";
import { inboxService } from "../services/InboxService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const filterBg = ref("favorite");

    async function getMyGroups() {
      try {
        await accountService.getMyGroups();
      } catch (error) {
        Pop.error(error, "[getMyGroups]");
      }
    }
    async function getMyLists() {
      try {
        await accountService.getMyLists();
        AppState.bgLists.filter((f) => f.listName == "favorite");
      } catch (error) {
        logger.error("[get my lists]", error);
        Pop.error(error);
      }
    }

    function focus() {
      document.getElementById("Fave").focus();
    }

    async function getInvites() {
      try {
        const inbox = await inboxService.getInvites();
        // console.log("getting invites", inbox);
        // setTimeout(1000)
        // getInvites()
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getMyGroups();
      getMyLists();
      focus();
      getInvites();
    });
    return {
      filterBg,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      groups: computed(() => AppState.groupMemberShips),
      // bgLists: computed(() => AppState.bgLists),
      // wishList: computed(() =>
      //   AppState.bgLists.filter((w) => w.listName == 'wish')
      // ),
      // favList: computed(() =>
      //   AppState.bgLists.filter((f) => f.listName == 'favorite')
      // ),
      // ownedList: computed(() =>
      //   AppState.bgLists.filter((o) => o.listName == 'owned')
      // ),
      bgLists: computed(() =>
        AppState.bgLists.filter((b) =>
          filterBg.value ? b.listName == filterBg.value : true
        )
      ),
    };
  },
  components: {
    GroupCard,
    GroupForm,
    ListCard,
    GroupGamesCard,
    EditBanner,
    EditName,
    EditPic,
    InviteLink,
  },
};
</script>

<style scoped>
.forcedImg {
  height: 150px;
  width: 150px;
  object-fit: cover;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.banner {
  min-height: 220px;
  background-size: cover;
  background-position: center center;
  /* background-image: url(https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80); */
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

.font {
  font-family: "Baloo 2", cursive;
  font-weight: 700;
  color: aliceblue;
  text-shadow: 2px 2px #3b8686, 0px 0px 5px #79bd9a;
}

.username {
  font-family: "Baloo 2", cursive;
  font-weight: 600;
  font-size: 3rem;
}

.cardholder {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.editprofilepic {
  transform: translateY(4rem) translateX(50px);
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
    font-size: 2rem;
  }
}
</style>
