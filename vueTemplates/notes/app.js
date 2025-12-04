const App = {
    data(){
        return {
            title : 'Список заметок',
            placeholderString: 'Добавьте заметку',
            inputValue: '',
            notes: ['Заметка 1'],
            checked: [false]
        }
    },
    methods: {
        inputChangeHandler(event){
        this.inputValue = event.target.value
        },
        addNewNote(){
            this.notes.push(this.inputValue),
            this.checked.push(false),
            this.inputValue = ''
        },
        deleteNote(idx){
            this.notes.splice(idx, 1),
            this.checked.splice(idx, 1)
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')