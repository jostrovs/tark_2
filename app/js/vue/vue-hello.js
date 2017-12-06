var $ = require("jquery");

Vue.component('vue-hello', {
    template:` 
    <p id="hello">{{greet}}</p>                                                                                         
    `,
    props: ['greet'],
    data: function(){
        return {
            greet: this.greet,
        }
    },
    mounted: function(){
        $("#hello").css("border", "1px solid red");
    }
});