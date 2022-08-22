<template>
  <div>
    <v-chip
      link
    >
      # {{ tag.tag_name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object
    }
  }
}
</script>
