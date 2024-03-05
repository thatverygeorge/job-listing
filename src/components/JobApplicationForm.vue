<script setup>
import { ref } from 'vue';
import IconClose from '@/components/icons/IconClose.vue';

const ERROR_MESSAGE = 'Companies usually prefer PDFs, but you do you.';

defineEmits(['close-modal']);

const dialog = ref(null);
const error = ref(null);

function showError() {
  error.value.textContent = ERROR_MESSAGE;
}

function hideError() {
  error.value.textContent = '';
}

function sendApplication(evt) {
  const formData = new FormData(evt.target);
  console.log(formData);
  evt.target.reset();
  hideError();
}

function handleUpload(evt) {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const isPDF = fileName.endsWith('pdf');

  if (!isPDF) {
    showError();
  } else {
    hideError();
  }
}

defineExpose({ dialog });
</script>

<template>
  <dialog class="modal" ref="dialog">
    <form class="form" @submit="sendApplication" method="dialog" aria-label="application">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required="true" />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required="true" />
      </div>

      <div>
        <label for="cover-letter">Cover letter:</label>
        <textarea id="cover-letter" name="cover-letter" rows="5"></textarea>
      </div>

      <div>
        <label for="resume">Upload your resume:</label>
        <input
          type="file"
          id="resume"
          accept="application/pdf"
          name="resume"
          @change="handleUpload"
        />
      </div>

      <span class="form__error" ref="error" aria-live="polite" role="alert"></span>

      <button class="button button--primary form__button form__button--send" type="submit">
        send
      </button>
    </form>

    <button
      class="button modal__button modal__button--close"
      type="button"
      @click="$emit('close-modal')"
    >
      <span class="visually-hidden">close modal</span>
      <IconClose />
    </button>
  </dialog>
</template>

<style scoped>
.modal {
  min-width: 30rem;
  width: 60rem;
  max-height: 60rem;
  padding: 2rem 7rem 2rem 2rem;
  border: 2px solid var(--green);
  border-radius: 5px;
  position: relative;
  overscroll-behavior: none;
}

.modal::backdrop {
  background-color: var(--black);
  opacity: 0.4;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form label {
  width: fit-content;
  font-size: 1.5rem;
  cursor: pointer;
}

.form input,
.form textarea {
  font-family: inherit;
  padding: 1rem;
  border: 2px solid var(--green);
  border-radius: 5px;
}

.form input:user-invalid {
  border-color: var(--red);
}

.form input:focus-visible,
.form textarea:focus-visible {
  outline: none;
  border-color: var(--black);
}

.form textarea {
  width: 100%;
  resize: vertical;
}

.form__error {
  font-size: 1.5rem;
  color: var(--red);
}

.form__button--send {
  max-width: 100%;
}

.modal__button--close {
  position: absolute;
  padding: 0.5rem;
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1rem;
  right: 1rem;
}

.modal__button--close:focus-visible svg {
  fill: var(--white);
}

@media (hover: hover) {
  .modal__button--close:hover svg {
    fill: var(--white);
  }
}

@media (width < 960px) {
  .modal {
    width: 90%;
  }
}
</style>
