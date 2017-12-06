
class Tuomari {
    constrctor(data_item){
        this.id = data_item.id;
        this.etunimi = data_item.etunimi;
        this.sukunimi = data_item.sukunimi;
        this.rooli = data_item.rooli;
    }
}

module.exports = Tuomari;