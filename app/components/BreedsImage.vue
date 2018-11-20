<template>
    <AppPage ref="page">
        <DockLayout stretchLastChild="true" >
            <GridLayout rows="220, auto" columns="*, *, *">
              <Image :src="src_img" stretch="aspectFill" colSpan="3" row="0" @tap="onTap" />
              <Label :text="this.selectedBreed" class="info" textWrap="true" row="0" colSpan="10" horizontalAlignment="center" verticalAlignment="center"/>
            </GridLayout>
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
  },
  methods:{
    onTap(){
      console.log("cricou")
    }
  }
}
</script>

<style scoped>
    Image {
      width: 100%;
      opacity: 0.4;
    }
    Label{
      font-size: 50%;
    }
</style>
