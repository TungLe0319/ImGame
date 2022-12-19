<template>
  <div
    class="modal fade"
    id="editBanner"
    tabindex="-1"
    aria-labelledby="bannerFormLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content bg-dark">
        <div class="modal-body FORM">
          <!-- -------------------SECTION FORM----------------------------------- -->
          <form @submit.prevent="handleSubmit" class="">
            <div class="row">
              <div class="col-md-8">
                <div class="mt-3 inputBox">
                  <span>CoverImg</span>
                  <input
                    type="url"
                    v-model="editable.coverImg"
                    name="coverImg"
                  />
                </div>
                <div class="mt-3 inputBox">
                  <span>UserName</span>
                  <input
                    type="text"
                    v-model="editable.name"
                    required
                    name="Username"
                  />
                </div>
                <div class="mt-3 inputBox">
                  <span>Profile Picture</span>
                  <input
                    type="url"
                    v-model="editable.picture"
                    required
                    name="Profile Picture"
                  />
                </div>
              </div>
            </div>

            <div class="my-3">
              <button
                class="btn button-51 selectable"
                type="submit"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../../AppState.js";
import { accountService } from "../../services/AccountService.js";
import { logger } from "../../utils/Logger.js";
import Pop from "../../utils/Pop.js";
export default {
  setup() {
    const editable = ref({});

    watchEffect(() => {
      editable.value = { ...AppState.account };
    });
    return {
      editable: editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value);
        } catch (error) {
          logger.error(error);
          Pop.error(error, "[EditBanner]");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
