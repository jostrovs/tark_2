class Aihe{
    constructor(data_item){
        this.id= data_item.id;
        this.nimi= data_item.nimi;
        this.no= data_item.no;
        this.otsikko= data_item.otsikko;
        this.teksti= data_item.teksti;
    }
}

module.exports = Aihe;