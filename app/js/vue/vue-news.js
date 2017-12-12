var moment = require("moment");

Vue.component('vue-news', {
    template:` 
    <div v-if="show" style="position: fixed; padding: 20px; background: #def; border: 2px solid #a33; top: 30px; left: 30px; z-index: 2000; min-width: 500px; max-width: 80%; min-height: 250px;">                                                                                                                                                                             
        <button class="btn btn-default" style="top: 10px; float: right; color: red;" @click="sulje()">X</button>
        <div style="margin-bottom: 60px">
            <slot>
            </slot>
        </div>         
        
        <div style="position: absolute; bottom: 16px; padding-top: 10px; width: 96%; border-top: 1px solid #aaa;">
            <input type="checkbox" v-model="dontShow"> Älä näytä tätä enää
            <div style="float: right; font-size: 12px; padding-top: 5px;">Sulje oikean yläkulman ruksista</div>
        </div>
    </div>                                                                                                                                                                            
    `,
    props: ['jos', 'news_moment'],
    data: function(){
        return {
            suljeHeti: false,
            dontShow: false,
        }
    },
    methods: {
        sulje(){
            if(this.dontShow) localStorage.tark_news = this.news_moment;
            this.suljeHeti = true;
        }
    },
    computed: {
        show(){
            if(this.suljeHeti) return false;
            if(localStorage.tark_news === "undefined") localStorage.tark_news = false;
            if(localStorage.tark_news && localStorage.tark_news != "false"){
                let m = moment(localStorage.tark_news);
                // console.log("localStorage: " + m.format("DD.MM.YYYY"));
                // console.log("News:         " + moment(this.news_moment).format("DD.MM.YYYY"));
                if(m.isBefore(moment(this.news_moment))){
                    //console.log("News: true");
                    return true;
                } 
                // console.log("News: false");
                return false;
            } 
            // console.log("News unset: true");
            
            return true;
        }
    }
});