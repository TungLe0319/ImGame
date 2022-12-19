<template>
  <div class="container" v-if="boardGame">
    <!-- SECTION start game info -->
    <div class="row justify-content-center">
      <div
        class="col-10 col-md-12 gradient-box text-center my-3 py-3 rounded animate__animated animate__fadeInDown elevation-3">
        <div class="font">{{ boardGame?.name }}</div>
        <h6>
          <b class="fs-4">{{ boardGame?.year_published }} <small class="mx-2"> ·</small>
            <i class="bi bi-people-fill fs-4"></i> {{ boardGame?.players }}
            <small class="mx-2"> ·</small>
            <i class="bi bi-clock-fill fs-5 me-1"></i>
            {{ boardGame?.playtime }} mins</b>
        </h6>
      </div>

      <div class="col-md-6 d-flex justify-content-center animate__animated animate__fadeInLeft">
        <img :src="boardGame?.large" alt="boardGameImg" class="img-fluid rounded animate__animated animate__fadeIn"
          v-if="boardGame?.large" />
        <img src="" alt="" class="skeleton-loader img-fluid" v-else>
      </div>

      <div class="col-md-6 p-3 mt-4 mt-md-0 animate__animated animate__fadeInRight info rounded elevation-3">
        <div class="row">
          <div class="col-md-6">
            <div class="d-flex flex-wrap text-wrap">
              <b>Categories:</b>
              <p class="ms-2">{{ categories.toString() }}</p>
            </div>



            <div class="d-flex flex-wrap text-wrap">
              <div class="dropdown">
                <b class="dropbtn">Mechanics:</b>
                <p class="ms-2 dropdown-content p-2">{{ mechanics.toString() }}</p>
                <b><i class="bi bi-search fs-5 ps-2 text-c5"></i></b>
              </div>
            </div>

            <!-- 
<div >
<button class="">Mechanics:</button>
<div class="">
{{ mechanics.toString() }}
</div>
</div> -->



          </div>
          <div class="col-md-6">
            <div v-if="boardGame?.average_user_rating > 0">
              <div class="d-flex">
                <b>Average User Rating:</b>

                <p class="ms-2">
                  {{ boardGame?.average_user_rating.toFixed(2) }} <b>/</b> 5
                </p>
                <!-- <div
                  class="d-flex"
                  v-for="i in Math.round(boardGame?.average_user_rating)"
                >
                  <i class="mdi mdi-star text-c7 list-group-item"></i>
                </div> -->
              </div>
            </div>

            <div v-if="boardGame?.average_learning_complexity > 0">
              <div class="d-flex">
                <b>Learning Complexity:</b>
                <p class="ms-2">
                  {{ boardGame?.average_learning_complexity.toFixed(2) }}
                  <b>/</b> 5
                </p>
              </div>
            </div>
            <div class="d-flex">
              <b>Ages:</b>
              <p class="ms-2">{{ boardGame?.min_age }}+</p>
            </div>
            <div class="d-flex" v-if="boardGame?.rank < 100">
              <b>Ranking:</b>
              <p class="ms-2">#{{ boardGame?.rank }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-12 ">
          <div class="p-4 rounded-5 desctext overflow-auto">
            <p>{{ boardGame?.description_preview }}</p>
          </div>
        </div>
        <div class="text-center mt-5">
          <b>Add to list</b>
        </div>
        <div class="d-flex justify-content-center my-3 my-md-0">
          <div class="col-3 text-center">
            <AddToList />
          </div>
        </div>
      </div>
    </div>
    <!-- SECTION end -->

    <div class="row game-images mt-3 ms-1 horizontal-scroll">
      <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
        clickable: true,
      }" :breakpoints="{
  '640': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  '1024': {
    slidesPerView: 5,
    spaceBetween: 50,
  },
}" :modules="modules" class="mySwiper">
        <swiper-slide v-for="i in images" :key="i.id">
          <ActiveBoardGameImages :images="i" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="mt-4">
      <div v-if="reviews?.length > 0">
        <h1>Reviews:</h1>
        <div class="row review-row">
          <div class="col-md-6" v-for="r in reviews" :key="r">
            <ABGReviews :review="r" />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <div class="col-md-10" v-if="prices?.length > 0">
          <div class="mt-5">
            <h1>Purchase game at:</h1>
          </div>
          <div class="row justify-content-center prices gradient-box text-dark mb-5 rounded">
            <div v-for="p in prices" :key="p.id" class="col-md-6">
              <ABGPrices :price="p" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="videos?.length > 0">
        <div class="mt-3">
          <h1>Videos about this game:</h1>
        </div>
        <div class="row">
          <div class="col-md-3 mb-4" v-for="v in videos" :key="v.id">
            <ActiveBoardGameVideos :video="v" />
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { atlasGamesService } from "../services/AtlasGamesService.js";
import Pop from "../utils/Pop.js";
import ActiveBoardGameImages from "../components/BoardGame/ActiveBoardGameImages.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, FreeMode } from "swiper";
import { ActiveBoardGameImage } from "../models/BoardGame/ActiveBoardGameImage.js";
import ActiveBoardGameVideos from "../components/BoardGame/ActiveBoardGameVideos.vue";
import ABGReviews from "../components/BoardGame/ABGReviews.vue";
import AddToList from "../components/BoardGame/AddToList.vue";
import ABGPrices from "../components/BoardGame/ABGPrices.vue";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const route = useRoute();
    async function getBoardGameDetailsById() {
      try {
        await atlasGamesService.getBoardGameDetailsById(route.params.id);
      } catch (error) {
        logger.error("[getBoardGameDetailsById]", error);
        Pop.error(error);
      }
    }

    async function getBoardGameImagesByGameId() {
      try {
        await atlasGamesService.getBoardGameImagesByGameId(route.params.id);
      } catch (error) {
        logger.error("[getBoardGameImagesByGameId]", error);
        Pop.error(error);
      }
    }

    async function getBoardGamePricesByGameId() {
      try {
        await atlasGamesService.getBoardGamePricesByGameId(route.params.id);
      } catch (error) {
        logger.error("[getBoardGamePricedByGameId]", error);
        Pop.error(error);
      }
    }
    async function getBoardGameVideosByGameId() {
      try {
        await atlasGamesService.getBoardGameVideosByGameId(route.params.id);
      } catch (error) {
        logger.error("[getBoardGameVideosByGameId]", error);
        Pop.error(error);
      }
    }

    async function getBoardGameReviewsByGameId() {
      try {
        await atlasGamesService.getBoardGameReviewsByGameId(route.params.id);
      } catch (error) {
        logger.error("[getBoardGameReviewsByGameId]", error);
        Pop.error(error);
      }
    }
    async function categoryList() {
      try {
        await atlasGamesService.getBoardGameCategoriesList();
      } catch (error) {
        Pop.error(error, "[]");
      }
    }
    async function mechanicsList() {
      try {
        await atlasGamesService.getBoardGameMechanicsList();
      } catch (error) {
        Pop.error(error, "[]");
      }
    }
    onMounted(() => {
      mechanicsList();
      categoryList();
      getBoardGameDetailsById();
      getBoardGamePricesByGameId();
      getBoardGameVideosByGameId();
      getBoardGameImagesByGameId();
      getBoardGameReviewsByGameId();
    });
    return {
      modules: [Pagination, Navigation, FreeMode],
      boardGame: computed(() => AppState.activeBoardGame),
      images: computed(() => AppState.activeBoardGameImages),
      videos: computed(() => AppState.activeBoardGameVideos),
      reviews: computed(() => AppState.activeBoardGameReviews),
      prices: computed(() => AppState.activeBoardGamePrices),

      categories: computed(() =>
        AppState.activeBoardGame.categories.map((x) => x.name.name)
      ),
      mechanics: computed(() =>
        AppState.activeBoardGame.mechanics.map((x) => x.name.name)
      ),

      async nextSet() {
        try {
          await atlasGamesService.getBoardGameImagesByGameId();
        } catch (error) {
          Pop.error(error, "[nextSetBGImages]");
        }
      },
      async previousSet() {
        try {
          await atlasGamesService.getBoardGameImagesByGameId();
        } catch (error) {
          Pop.error(error, "[previousSetBGImages]");
        }
      },
    };
  },
  components: {
    ActiveBoardGameImages,
    Swiper,
    SwiperSlide,
    ActiveBoardGameVideos,
    ABGReviews,
    AddToList,
    ABGPrices,
  },
};
</script>

<style lang="scss" scoped>
.customSize {
  height: 700px;

  object-fit: contain;
}

b {
  font-size: 14pt;
}

p {
  padding-top: 2.5px;
  margin-bottom: 0;

  font-weight: 600;
  color: #0b486b;
}

.price-row {
  height: 20rem;
  overflow: auto;
}

.horizontal-scroll {
  border-radius: 4px;
  max-height: 30rem;
  height: 30rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
}

.review-row {
  height: 30rem;
  overflow: auto;
}

.game-images {
  height: 25vh;
}

.game-img {
  background-size: cover;
}

.list-button {
  background-color: #8adab0;
}

.info {
  background-color: #dbdbdbd7;
}

.hi {
  padding-left: 9rem;
  padding-right: 9rem;
}

.prices {
  height: 350px;
  overflow: auto;
  // border: #3b8686 solid 10px;
}

.reviews {
  overflow: auto;
}

.desc {
  padding-left: 300px;
  padding-right: 300px;
}

.font {
  font-weight: 600;
  font-size: 50px;
  text-shadow: 2px 2px 0px rgba(231, 239, 240, 0.92);
}

* {
  font-family: "Baloo 2", cursive;
}

.desctext {
  // letter-spacing: .06em;
  max-height: 40vh;
}





/* Dropdown Button */
// .dropbtn {
//   background-color: #04AA6D;
//   color: white;
//   padding: 16px;
//   font-size: 16px;
//   border: none;
// }

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 300px;
  padding-left: 10%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;

}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;

  border-radius: 4px;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
// .dropdown:hover .dropbtn {
//   background-color: #3e8e41;
// }
</style>
