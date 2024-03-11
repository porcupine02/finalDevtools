<!-- Modal.vue -->
<template>
    <div class="modal" :class="{'is-active': isActive}">
      <div class="modal-background" @click="closeModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">{{ title }}</p>
          <!-- <button class="delete" aria-label="close" @click="closeModal()"></button> -->
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <!-- You can add a footer here if needed -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      title: String
    },
    methods: {
      closeModal() {
        this.$emit('update:isActive', false);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  