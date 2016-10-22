<style src='./assets/css/app.sass' lang='sass?indentedSyntax'></style>

<template lang='pug'>
  #app
    img(src='./assets/img/logo.png')
    h1 {{ msg }}
    h2 Essential Links
    ul
      li
        a(href='https://vuejs.org', target='_blank') Core Docs
      li
        a(href='https://forum.vuejs.org', target='_blank') Forum
      li
        a(href='https://gitter.im/vuejs/vue', target='_blank') Gitter Chat
      li
        a(href='https://twitter.com/vuejs', target='_blank') Twitter
    h2 Ecosystem
    ul
      li
        a(href='http://router.vuejs.org/', target='_blank') vue-router
      li
        a(href='http://vuex.vuejs.org/', target='_blank') vuex
      li
        a(href='http://vue-loader.vuejs.org/', target='_blank') vue-loader
      li
        a(href='https://github.com/vuejs/awesome-vue', target='_blank') awesome-vue
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
