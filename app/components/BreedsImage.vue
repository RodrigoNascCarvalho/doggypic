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
      loading: true,
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
    [v-cloak] {
        display: none;
    }

    ActionBar {
        background-image: linear-gradient(to bottom, #53ba82, #68a182);
        color: #ffffff;
    }

    .context-section {
        background-color: #53ba82;
    }

    .context-section .context-text {
        width: 100%;
        height: 100%;
        padding: 15px 30px;
        font-size: 20;
        font-weight: 700;
        color: #ffffff;
    }

    ActivityIndicator {
        width: 20%;
        height: auto;
    }

    Image {
        width: 100%;
    }
</style>
