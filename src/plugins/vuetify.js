import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        dark: false,
        themes: {
            dark: {
                bgColor: '#0f1525',
                bgColor2: '#091618',
                primary: '#7678ed',
                secondary: '#6e9887',
                error: '#ff6b6b'
            },
            light: {
                bgColor: '#f7fff7',
                bgColor2: '#fffbe6',
                primary: '#7678ed',
                secondary: '#6e9887',
                error: '#ff6b6b'
            },
        }
    }
})