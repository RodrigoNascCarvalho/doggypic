<template>
    <AppPage ref="page">
        <DockLayout stretchLastChild="true" >
            <GridLayout rows="220, auto" columns="*, *, *">
              <Image :src="img" stretch="aspectFill" colSpan="3" row="0" @tap="onTap" />
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
      img: ''
    }
  },
  props: [
    'selectedBreed'
  ],
  mounted () {
    http.getJSON('https://dog.ceo/api/breed/' + this.selectedBreed + '/images/random')
      .then(async result => {
        const src_img = result.message
        this.img = await fromUrl(src_img)
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
        const downloadFolder = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString()
        const pathDest = path.join(downloadFolder, this.selectedBreed + '.png')
        const saved = this.img.saveToFile(pathDest, 'png')
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
