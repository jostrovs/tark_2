var moment = require("moment");


var GET_DATA = 'http://www.lentopalloerotuomarit.fi/tuomaritarkkailu/api/getData.php';
var INSERT_REPORT = 'http://www.lentopalloerotuomarit.fi/tuomaritarkkailu/api/insertReport.php';
var REQUEST_LINK = 'http://www.lentopalloerotuomarit.fi/tuomaritarkkailu/api/requestLink.php';
if(location.href.indexOf("localhost")>-1){
    GET_DATA = './api/getData.php';
    INSERT_REPORT = './../api/insertReport.php';
    REQUEST_LINK = './../api/requestLink.php';
}

moment.locale("fi");

var BROWSER= (function(){
    console.log("Haetaan browserii...");
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

if(BROWSER.toLowerCase().indexOf("ie ") > -1){
    alert("Tuomaritarkkailusivun käyttö ei ole mahdollista Internet Explorer -selaimella.\r\n\r\nSuosittelemme käytettäväksi Chromea. Klikkaa Ok, niin sinut ohjataan suoraan lataussivulle.");
    window.location.href = "https://www.google.fi/chrome/browser/desktop/index.html";
}


function getQueryString() {
    var result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;
  
    while (m = re.exec(queryString)) {
      result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
  
    return result;
}

function getUserToken(){
    let token = getQueryString()['token'];
    if(token == undefined || token == null || token.length < 1){
        if(localStorage.lentopalloerotuomarit_tarkUserToken){
            return localStorage.lentopalloerotuomarit_tarkUserToken;
        }
    }
    localStorage.lentopalloerotuomarit_tarkUserToken = token;
    return token;
}

var localGetData=function(cmd, callback, arg1, token) {
    $.ajax({
        dataType: 'json',
        url: GET_DATA,
        data: {cmd:cmd, arg1:arg1, token:getUserToken(), browser: BROWSER}
    }).done(function(data){
        if(data.error == 1){
            toastr.error("Käyttäjää ei ole autentikoitu. (1)");
            return;
        }
        if(callback != undefined){
            callback(data);
        }
    }).fail(function(){
        toastr.error("Tietojen haku kannasta epäonnistui.")
    });
}

module.exports = {
    BROWSER: BROWSER,
    GET_DATA: GET_DATA,
    INSERT_REPORT: INSERT_REPORT,
    REQUEST_LINK: REQUEST_LINK,
         
    getQueryString: getQueryString,
    getUserToken: getUserToken,
    localGetData: localGetData,
}
