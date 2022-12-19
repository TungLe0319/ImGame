<template>
  <div
    class="modal"
    id="editProfilePic"
    tabindex="-1"
    aria-labelledby="profilePicFormLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content bg-dark">
        <div class="modal-body FORM">
          <!-- -------------------SECTION FORM----------------------------------- -->
          <form @submit.prevent="handleSubmit" class="">
            <div class="row">
              <div class="col-md-6">
                <div>
                  <label for="profilepic">New Profile Picture</label>
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
                class="btn btn-success selectable"
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
