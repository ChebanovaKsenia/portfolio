const App = {
    data(){
        return {
            counter: 0,
            title : `Счетчик: `
        }
    }
}

const app = Vue.createApp(App)

app.mount('#app')