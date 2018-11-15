<template>
    <Page v-cloak>
        <ActionBar title="Doggy Pic" flat="true"/>
        <DockLayout stretchLastChild="true" >
            <StackLayout class="context-section" dock="top" verticalAlignment="middle" height="7%" v-if="sectionName">
                 <Gradient direction="to bottom" colors="#68a182, #3c875e">
                    <Label  :text="sectionName" class="context-text"/>
                 </Gradient>
            </StackLayout>
            <FlexboxLayout flexDirection="column">
                <ActivityIndicator height="100%" :busy="loading" v-show="loading"/>
                <slot/>
            </FlexboxLayout>
        </DockLayout>
    </Page>
</template>

<script>
export default {
  props: {
    sectionName: String
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    setLoading (status) {
      this.loading = status
    }
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
        padding: 15px 50px;
        font-size: 20;
        font-weight: 700;
        color: #ffffff;
    }

    ListView .doggo {
        font-size: 20px;
        font-weight: 500;
        color: #fff0e1;
        text-align: center;
        padding: 50px;
    }

    FlexboxLayout {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ActivityIndicator {
        width: 20%;
        height: auto;
    }

    FlexboxLayout {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ActivityIndicator {
        width: 20%;
        height: auto;
    }
</style>
