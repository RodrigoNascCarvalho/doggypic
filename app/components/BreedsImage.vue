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
/* global android */
import * as http from 'http'
import AppPage from './AppPage.vue'
import { path } from 'tns-core-modules/file-system'
import { fromUrl } from 'tns-core-modules/image-source'
import { makeText } from 'nativescript-toast'

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
  methods: {
    async onTap () {
      try {
        const img = await fromUrl(this.src_img)
        const downloadFolder = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString()
        const pathDest = path.join(downloadFolder, this.selectedBreed + '.png')
        const saved = img.saveToFile(pathDest, 'png')
        if (saved) {
          const toast = makeText(`Saved ${this.selectedBreed} image to ${pathDest}`, 'long')
          toast.show()
        }
      } catch (err) {
        const errorToast = makeText(`Error saving image`, 'long')
        errorToast.show()
      }
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
