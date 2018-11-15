<template>
  <AppPage ref="page" section-name="Select your breed:">
    <Gradient direction="to right" colors="#ff6e92, #ffa36d, #ff6e92">
      <ListView @itemTap="onItemTap" height="100%" for="breed in breedList" v-if="breedList.length" separatorColor="#ffe2e2">
        <v-template>
          <StackLayout>
            <Label class="doggo" :text="breed"/>
          </StackLayout>
        </v-template>
      </ListView>
    </Gradient>
  </AppPage>
</template>

<script>
import AppPage from './AppPage.vue'
import BreedsImage from './BreedsImage.vue'

import * as http from 'http'

export default {
  components: {
    AppPage
  },
  data () {
    return {
      breedList: []
    }
  },
  methods: {
    onItemTap (event) {
      this.$navigateTo(BreedsImage, {
        props: {
          selectedBreed: event.item
        }
      })
    }
  },
  mounted () {
    http.getJSON('https://dog.ceo/api/breeds/list/all')
      .then(data => {
        this.breedList = Object.keys(data.message).map(breed => breed)
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
    ListView .doggo {
        font-size: 20px;
        font-weight: 500;
        color: #fff0e1;
        text-align: center;
        padding: 50px;
    }
</style>
