<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" v-if="!pluginVisible" v-bind:class="{ warning: !pluginVisible }">
          <small>{{pluginTitle}}</small>
        </b-col>
        <b-col v-if="pluginVisible">
          <b-card header="Snippet Preview" class="mb-2">
            <snippet-preview
              :title="metaTitle"
              :description="metaDescription"
              :url="url"
              baseUrl="https://www.rafaellabarros.com/"
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
              :text="text"
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
                  :text="text"
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
  import fetchCheerio from 'fetch-cheerio-object'
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
      pluginTitle: 'Carregando...',
      focusKeywords: [
        'fotografia',
        'ensaio feminino'
      ],
      metaTitle: '',
      metaDescription: '',
      url: '',
      text: '',
      titleWidth: 0,
      titleLengthPercent: 0,
      descriptionLengthPercent: 0,
      translations: null,
      pluginVisible: false,
      locale: 'en_US',
      localeOptions: [
        {
          text: 'en_US',
          value: 'en_US'
        }
      ]
    }),
    computed: { },
    created () {
      var $el = this
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        var activeTab = tabs[0]
        if (activeTab.url.startsWith('https://prosite.alboompro.com')) {
          chrome.tabs.sendMessage(activeTab.id, {greeting: 'hello', message: 'start'}, function (response) {
            fetchCheerio(response.previewUrl).then($ => {
              $el.pluginVisible = true
              $el.metaTitle = $('title').text()
              $el.metaDescription = $('meta[name=description]').attr('content')
              var canonicalUrl = $('link[rel=canonical]').attr('href')
              $el.url = URL(canonicalUrl).pathname.substr(1)
              $el.text = $('main#albumPageDescription').html()
            })
          })
        } else {
          $el.pluginTitle = 'Esse plugin só pode ser usado no Alboom ProSite.'
        }
      })
    },
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
  div.warning {
    min-width: 320px;
    padding: 20px;
  }
</style>