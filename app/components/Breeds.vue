<template>
    <Page>
        <ActionBar title="Select your breed:"/>
        <GridLayout columns="*" rows="*">
            <ActivityIndicator :busy="loading" />
            <ListPicker :items="breedList"
                        selectedIndex=""
                        @selectedIndexChange="onSelectionChange"
                />
        </GridLayout>
    </Page>
</template>

<script>
//import axios from "axios"
    import * as http from "http";

    export default {
        data() {
            return {
                breedList: [],
                loading: false
            }
        },
        methods: {
            setLoading(status) {
                this.loading = status
            },
            onSelectionChange() {
                return;
            }
        },
        mounted() {
            this.setLoading(true)
            /**
             * - Calls Dog CEO API
             * - Data will be in the form:
             * {"status":"success","message":{"affenpinscher":[],"african":[], ... }
             * - We want something like:
             * [ "Affenpinscher", "African", ... ]
             */

            http.getJSON('https://dog.ceo/api/breeds/list/all').then(data => {
                    /**
                     * Object.keys transforms:
                     * { "a": 1, "b": 2 }
                     * into
                     * ["a", "b"]
                     * */
                    this.breedList = Object.keys(data.message).map(function(breed) {
                        return breed + '  doggo'
                    })
                })
                .catch(err => {
                    console.error('There was an error:', err)
                })
                .finally(
                    this.setLoading(false)
                );
        },
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>