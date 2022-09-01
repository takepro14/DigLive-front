<template>
  <v-data-table
    :headers="headers"
    :items="boards"
    class="elevation-1"
  >
    <template
      #body="{ items }"
    >
      <tbody>
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ $my.format(item.updated_at) }}</td>
        </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    boards: {
      type: Array
    }
  },
  data () {
    return {
      headers: [
        { text: 'タイトル', align: 'start', sortable: false },
        { text: '説明', align: 'start', sortable: false },
        { text: 'スレ主', align: 'start', sortable: false },
        { text: '最終更新日', align: 'start', sortable: false }
      ]
    }
  }
}
</script>
