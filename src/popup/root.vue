<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12">
          <small>YoastSEO for Alboom ProSite</small>
        </b-col>
        <b-col >
          <b-card header="Snippet Preview" class="mb-2">
            <snippet-preview
              :title="metaTitle"
              :description="metaDescription"
              :url="url"
              baseUrl="https://my-site.com/"
              @update:titleWidth="(value) => titleWidth = value"
              @update:titleLengthPercent="(value) => titleLengthPercent = value"
              @update:descriptionLengthPercent="(value) => descriptionLengthPercent = value" />
          </b-card>
          <b-card header="Content Assessor" class="mb-2">
            <content-assessor
              :title="metaTitle"
              :titleWidth="titleWidth"
              :description="metaDescription"
              :url="url"
              :text="description"
              :locale="locale"
              :translations="translations"
              :resultFilter="assessorResultFilter" />
          </b-card>
          <b-card header="SEO Assessor" class="mb-2" no-body>
            <b-tabs card>
              <b-tab :title="'FocusKeyword ' + (index + 1)" v-for="focusKeyword, index in focusKeywords" :key="index">
                <b-form-group label="Focus Keyword">
                  <b-form-textarea v-model="focusKeywords[index]" />
                </b-form-group>
                <seo-assessor
                  :keyword="focusKeyword"
                  :title="metaTitle"
                  :description="metaDescription"
                  :url="url"
                  :text="description"
                  :locale="locale"
                  :translations="translations"
                  :resultFilter="assessorResultFilter" />
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import ContentAssessor from 'vue-yoast-bootstrap/src/components/ContentAssessor'
  import SeoAssessor from 'vue-yoast-bootstrap/src/components/SeoAssessor'
  import SnippetPreview from 'vue-yoast-bootstrap/src/components/SnippetPreview'

  Vue.use(BootstrapVue)

  export default {
    components: {
      ContentAssessor,
      SeoAssessor,
      SnippetPreview
    },
    data: () => ({
      focusKeywords: [
        'One',
        'Amazing',
        'Keyword'
      ],
      metaTitle: 'My Amazing Title',
      metaDescription: 'The short description',
      url: 'page/1',
      description: '<h2>Here is subtitle!</h2> and some contents in HTML',
      titleWidth: 0,
      titleLengthPercent: 0,
      descriptionLengthPercent: 0,
      translations: null,
      locale: 'en_US',
      localeOptions: [
        {
          text: 'en_US',
          value: 'en_US'
        }
      ]
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: {
      tab () {
        chrome.tabs.create({ url: 'pages/app.html' })
      },
      assessorResultFilter (value) {
        return value
      }
    }
  }
</script>
<style lang="scss">
  div.container {
    max-width: 600px;
  }
</style>