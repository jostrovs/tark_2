var moment = require("moment");
var CONST = require("./../const/const.js");

class Raportti{
    constructor(data_item, last_login){
        this.id= "0";
        this.koti= "";
        this.vieras= "";
        this.paikka= "";
        this.pvm= "";
        this.updated= moment("2000-01-01 00:00:00");

        this.pt_id= "0";
        this.pt_nimi= "";

        this.vt_id= "0";
        this.vt_nimi= '';

        this.pt_huom= '';
        this.vt_huom= '';
        this.raportti_huom= '';

        this.tark_id= "0";
        this.tark_nimi= '';

        this.miehet= CONST.RADIO_MIEHET;
        this.tulos= "";
        this.kesto_h= 0;
        this.kesto_min= 0;
        this.vaikeus= CONST.NORMAALI;

        this.pt_score= -1;
        this.vt_score= -1;
    
        this.pt_huomautukset= [];
        this.vt_huomautukset= [];

        this.rivit= [];

        if(data_item != null){
            this.id = data_item.id;
            this.koti = data_item.koti;
            this.vieras = data_item.vieras;
            this.paikka = data_item.paikka;
            this.pvm = data_item.pvm;
            this.updated = data_item.updated;
    
            this.pt_id = data_item.pt_id;
            this.pt_nimi = data_item.pt_etunimi + ' ' + data_item.pt_sukunimi;
    
            this.vt_id = data_item.vt_id;
            this.vt_nimi = data_item.vt_etunimi + ' ' + data_item.vt_sukunimi;
    
            this.pt_huom = data_item.pt_huom;
            this.vt_huom = data_item.vt_huom;
    
            this.raportti_huom = data_item.raportti_huom;
    
            this.tark_id = data_item.tark_id;
            this.tark_nimi = data_item.tark_etunimi + " " + data_item.tark_sukunimi;
    
            this.miehet = data_item.miehet;
            this.tulos = data_item.tulos;
            this.kesto_h = data_item.kesto_h;
            this.kesto_min = data_item.kesto_min;
            this.vaikeus = data_item.vaikeus;
    
            this.is_new = false;
            if(typeof(last_login) !== 'undefined'){
                if(moment(last_login).isBefore(moment(this.updated))) this.is_new = true;
            }
        }

        this.laske();
        
    }
     
    palautaRivit(firstNo, lastNo){
        return this.rivit.filter(function(rivi){rivi.aihe_no >= firstNo && rivi.aihe_no <= lastNo});
    }
    
    laske(){
        let pt_score = 950;
        let vt_score = 950;
        for(let i=0;i<this.rivit.length;++i){
            let rivi = this.rivit[i];
            let index = rivi.arvosana;
            if(index == undefined) index = 2;
            let k_rivi = kertoimet[rivi.aihe_no];
            if(k_rivi==undefined){
                let breaker=0;
            }
            let k_a = k_rivi[index];
            
            if(rivi.aihe_no < 100){
                pt_score += k_a;
            } else {
                vt_score += k_a;
            }
        }

        this.pt_score = pt_score/10;
        this.vt_score = vt_score/10;
        if(this.rivit.length < 1 || this.pt_score > 200) this.pt_score = "<puuttuu>";
        if(this.rivit.length < 1 || this.vt_score > 200) this.vt_score = "<puuttuu>";
    }
    
    getRivit(callback){
        let self = this;
        localGetData(API_HAE_RAPORTIN_RIVIT, function(data){
            self.rivit = [];
            if(data.data == undefined){
                    console.log("getRivit: data.data = null");
                    return;
            }

            self.pt_huomautukset = [];
            self.vt_huomautukset = [];

            for(let i=0;i<data.data.length;++i){
                let rivi=data.data[i];
                
                if(rivi.no < 100 && rivi.huom.length > 0){
                    self.pt_huomautukset.push(Huomautus(rivi));
                }
                if(rivi.no > 100 && rivi.huom.length > 0){
                    self.vt_huomautukset.push(Huomautus(rivi));
                }
                
                let uusiRivi = Rivi(rivi);
                self.rivit.push(uusiRivi);
            }
            self.laske();

            if(typeof(callback) !== 'undefined') callback();
        }, self.id);
    }
    
    title(){
        return this.koti + " - " + this.vieras + "   " + moment(this.pvm).format("DD.MM.YYYY");
    }
};

module.exports = Raportti;