<template>
  <div class="GameNightCard  card my-2 elevation-3 position-relative " :style="{ backgroundImage: getRandomBg() }">
    <div class="row justify-content-center">
      <div class="col-7 col-md-8 rounded bg-c4 m-2 upcomingGameNight ">

        <div class="d-flex justify-content-center mt-2 text-center">
          <h2>Upcoming Gamenight</h2><i title="Remove Game Night"
            class="mdi mdi-close text-danger fs-4 selectable position-absolute rounded x" @click="removeGameNight()"
            v-if="gameNightCreator || groupOwner"></i>
        </div>
        <div class="d-flex justify-content-center mb-2">
          <button class="btn button-51 animate__animated animate__fadeIn" @click="attendGamenight(gamenight?.id)"
            v-if="!attending">
            I'm Attending <i class="bi bi-person-plus-fill"></i>
          </button>
          <button class="btn button-51 animate__animated animate__fadeIn" @click="attendGamenight(gamenight?.id)"
            v-else>
            Unattend <i class="bi bi-person-dash-fill"></i>
          </button>
        </div>
        <div class="justify-content-center d-flex">
          <span>
            <p>
              {{
                  new Date(gamenight?.startDate).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
              }}
            </p>
          </span>
          <span class="mx-4">
            <p>
              {{
                  new Date(gamenight?.startDate).toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
              }}
            </p>
          </span>
          <span>
            <p>At: {{ gamenight?.location }}</p>
          </span>
        </div>
      </div>
      <div class="col-5 col-md-6 p-0 ps-md-3">
        <div class="card m-2 noborder">
          <div class="bg-c4 text-center rounded-top">
            <h5 class="mt-1">Attending:</h5>
          </div>
          <div class="p-2 bg-c2 text-center rounded-bottom" v-if="gamenight?.groupMemberIds">
            <TransitionGroup name="custom-classes" enterActiveClass="animate__zoomIn animate__animated"
              leaveActiveClass="animate__zoomOut animate__animated">
              <router-link :to="{ name: 'Profile', params: { id: g?.id } }" v-for="g in gamenight?.groupMemberIds"
                :key="g.id">
                <img :src="g?.picture" :alt="g?.name" :title="g?.name" height="45" width="45"
                  class="rounded-circle box-shadow m-1 profile-img" />
              </router-link>
            </TransitionGroup>

            <!-- <img :src="g.picture" :alt="g.name" height="55" class="rounded-circle me-1 box-shadow"
                v-for="g in gamenight?.groupMemberIds" :groupMemberId="g" /> -->
          </div>
        </div>
      </div>
      <div class="col-5 col-md-6 p-0 pe-md-3">
        <div class="card m-2 noborder elevation-4">
          <div class="bg-c4 text-center p-1 rounded-top">
            <h5 class="mt-1">Playing:</h5>
          </div>
          <div class="bg-c2 p-2 rounded-bottom">
            <div class="d-flex justify-content-center">
              <div class="col-md- bg-c2 rounded-1 fs-5 text-center px-3 py-1 my-1">
                <b class="namefont">{{ gamenight?.game }}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { prop } from "dom7";
// import { next } from "dom7";
import { AppState } from "../../AppState.js";
import { GameNight } from "../../models/GroupsAndGameNight/GameNight.js";
// import { Group } from "../../models/GroupsAndGameNight/Group.js";
import { gameNightsService } from "../../services/GameNightsService.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";

export default {
  props: {
    gamenight: { type: GameNight, required: true },
    // group: { type: Group, required: true }
  },

  setup(props) {

    const bgs = [
      'url(https://images.unsplash.com/photo-1500995617113-cf789362a3e1)',

      'url(https://images.unsplash.com/photo-1611891487122-207579d67d98)',

      'url(https://images.unsplash.com/photo-1547638375-ebf04735d792)',

      'url(https://images.unsplash.com/photo-1606503153255-59d8b8b82176)',

      'url(https://images.unsplash.com/photo-1561079028-f20597c34f21)',

      'url(https://images.unsplash.com/photo-1606559497615-e4787c3c75a1)',

      'url(https://images.unsplash.com/photo-1563811771046-ba984ff30900)',

    ]

    return {
      gameNightCreator: computed(
        () =>
          props.gamenight.creatorId == AppState.account.id
      ),
      groupOwner: computed(() =>
        props.gamenight.groupCreator == AppState.account.id),

      attending: computed(() =>
        props.gamenight.groupMemberIds.find((g) => g.id == AppState.account.id)
      ),
      memberGoing: computed(() => {
        [
          seeTheSame(groupMembers, props.gamenight.groupMemberIds),
          seeTheSame(props.gamenight.groupMemberIds, groupMembers),
        ];
      }),
      getRandomBg() {
        return bgs[Math.floor(bgs.length * Math.random())]
      },

      seeTheSame(array1, array2) {
        return array1.filter((object1) => {
          return array2.some((object2) => {
            return object1.id === object2.id;
          });
        });
      },

      async removeGameNight() {
        try {
          const yes = await Pop.confirm("Cancel this gamenight??");
          if (!yes) {
            return;
          }
          await gameNightsService.removeGameNight(props.gamenight.id);
        } catch (error) {
          logger.error("[]", error);
          Pop.error(error);
        }
      },

      async addGameNight() {
        try {
          await gameNightsService.addGameNight(props.gamenight.id);
        } catch (error) {
          Pop.error(error);
        }
      },
      async attendGamenight(gamenightId) {
        try {
          await gameNightsService.attendGamenight(gamenightId);
        } catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>

.bgc3 {
  background-color: rgba(0, 255, 157, 0.364);
}

.x {
  transform: translateX(15rem);
  background-color: rgba(245, 245, 245, 0.538);
}

.text-shadow {
  color: aliceblue;
  text-shadow: 1px 1px black, 0px 0px 5px salmon;
  font-weight: bold;
  letter-spacing: 0.08rem;
  /* Second Color  in text-shadow is the blur */
}

.forcedImg {
  height: 300px;
  width: 300px;
  object-fit: cover;
}

.noborder {
  border: none;
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

* {
  font-family: 'Baloo 2', cursive;
}

.card {
  background-size: cover;
  transition: all 0.5s ease;
}

.card:hover {
  transform: scale(1.01);
  transition: all 0.5s ease;
}
</style>
