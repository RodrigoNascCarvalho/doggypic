<template>
    <Page>
        <ActionBar title="Doggy Pic" flat="true"/>
        <DockLayout stretchLastChild="true" >
            <StackLayout class="context-section" dock="top" verticalAlignment="middle" height="7%">
                 <Gradient direction="to bottom" colors="#68a182, #3c875e">
                    <Label  text="Select your breed:" class="context-text"/>
                 </Gradient>
            </StackLayout>
            <Gradient direction="to right" colors="#ff6e92, #ffa36d, #ff6e92">
                <FlexboxLayout flexDirection="column" v-cloak>
                    <ActivityIndicator height="100%" :busy="loading" v-show="loading"/>
                        <ListView @itemTap="onItemTap" height="100%" for="breed in breedList" v-if="breedList.length" separatorColor="#ffe2e2">
                            <v-template>
                                <StackLayout>
                                    <Label class="doggo" :text="breed" />
                                </StackLayout>
                            </v-template>
                        </ListView>
                </FlexboxLayout>
            </Gradient>
        </DockLayout>
    </Page>
</template>

<script>
    import * as http from "http";
    import BreedsImage from './BreedsImage.vue';

    export default {
        data() {
            return {
                breedList: [],
                loading: true
            }
        },
        methods: {
            setLoading(status) {
                this.loading = status
            },
            onSelectionChange() {
                return;
            },
            test(value) {
                console.log('changed', value)
            },
            onItemTap(event){

                this.$navigateTo(BreedsImage, {
                    props:{
                        selectedBreed: event.item
                    }
                })
            }
        },
        mounted() {
            http.getJSON('https://dog.ceo/api/breeds/list/all').then(data => {
                    this.breedList = Object.keys(data.message).map(breed => breed)
                })
                .catch(err => {
                    console.error('There was an error:', err)
                })
                .finally(() => {
                    this.setLoading(false)
                });
        },
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
</style>