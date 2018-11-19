<template>
    <AppPage ref="page">
        <DockLayout stretchLastChild="true" >
            <Image :src="src_img" />
        </DockLayout>
    </AppPage>
</template>

<script>
import * as http from 'http'
import AppPage from './AppPage.vue'

export default {
  components: {
    AppPage
  },
  data () {
    return {
      src_img: ''
    }
  },
  props: [
    'selectedBreed'
  ],
  mounted () {
    http.getJSON('https://dog.ceo/api/breed/' + this.selectedBreed + '/images/random')
      .then(result => {
        this.src_img = result.message
      })
      .catch(err => {
        console.error('There was an error:', err)
      })
      .finally(() => {
        this.$refs.page.setLoading(false)
      })
  }
}
</script>

<style scoped>
    Image {
        width: 100%;
    }
</style>
