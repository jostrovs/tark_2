class Rivi{
    constructor(data_item){
        this.vanhat_rivit=[];
        
        this.aihe_id= data_item.aihe_id;
        this.arvosana= data_item.arvosana;
        this.huom= data_item.huom;
        this.raportti_id= data_item.raportti_id;
        this.otsikko= data_item.otsikko;
        this.teksti= data_item.teksti;

        this.aihe_nimi= data_item.nimi;
        this.aihe_no= data_item.no;

        this.raportti_pvm= data_item.pvm;
        this.raportti_koti= data_item.koti;
        this.raportti_vieras= data_item.vieras;
        this.raportti_pt_score= data_item.pt_score;
        this.raportti_vt_score= data_item.vt_score;

        if(data_item != null){
            this.id = data_item.id;
        } else {
            this.id = 0;
        }
    }

    tekstiDisplayed(){
        return this.teksti != undefined && this.teksti.length>0;
    }
    huomDisplayed(){
        return this.huom != undefined && this.huom.length>0;
    }
    getOttelu(){
        let pvm = "&lt;ei pvm&gt;";
        if(this.raportti_pvm != undefined) pvm = this.raportti_pvm.split(" ")[0];
        return {
            pvm: pvm,
            koti: this.raportti_koti,
            vieras: this.raportti_vieras,
            pt_score: this.raportti_pt_score,
            vt_score: this.raportti_vt_score,
        };
    }
}

module.exports = Rivi;