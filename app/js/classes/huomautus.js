class Huomautus{
    constructor(rivi){
        this.id= rivi.no;
        this.aihe= rivi.otsikko;
        this.teksti= rivi.huom;
    }
}

module.exports = Huomautus;