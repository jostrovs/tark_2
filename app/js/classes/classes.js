



function Aihe(data_item){
    return {
        id : data_item.id,
        nimi : data_item.nimi,
        no : data_item.no,
        otsikko : data_item.otsikko,
        teksti : data_item.teksti,
    }
}

function Rivi(data_item){
    ret = {
        vanhat_rivit:[],
        
        aihe_id : data_item.aihe_id,
        arvosana : data_item.arvosana,
        huom : data_item.huom,
        raportti_id : data_item.raportti_id,
        otsikko : data_item.otsikko,
        teksti : data_item.teksti,

        aihe_nimi : data_item.nimi,
        aihe_no : data_item.no,

        raportti_pvm : data_item.pvm,
        raportti_koti : data_item.koti,
        raportti_vieras : data_item.vieras,
        raportti_pt_score : data_item.pt_score,
        raportti_vt_score : data_item.vt_score,

        tekstiDisplayed: function(){
            return this.teksti != undefined && this.teksti.length>0;
        },
        huomDisplayed: function(){
            return this.huom != undefined && this.huom.length>0;
        },
        getOttelu: function(){
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
    
    };
    if(data_item != null){
        ret.id = data_item.id;
    } else {
        ret.id = 0;
    }
    return ret;
}

function Huomautus(rivi){
    return {
        id : rivi.no,
        aihe : rivi.otsikko,
        teksti : rivi.huom,
    }
}

function palauta_pt_huomautukset(raportti){
    let ret = [];
    let rivit = raportti.palautaRivit(1, 17);
    for(let i=0;i<rivit.length;i++){
        let rivi=rivit[i];
        if(rivi.huomDisplayed()){
            ret.push(Huomautus(rivi));
        }
    }
    return ret;
}

function palauta_vt_huomautukset(raportti){
    let ret = [];
    let rivit = raportti.palautaRivit(100, 117);
    for(let i=0;i<rivit.length;i++){
        let rivi=rivit[i];
        if(rivi.huomDisplayed()){
            ret.push(Huomautus(rivi));
        }
    }
    return ret;
}

