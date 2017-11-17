/**
 * Created by evgeni on 17.11.2017.
 */
var xhr = new XMLHttpRequest();
xhr.open('GET', 'tsconfig.json', false);
xhr.send();
if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
    console.log('kjifhf');
}
else {
    //alert( xhr.responseText );
    var items = JSON.parse(xhr.responseText);
    var items50 = items.items50;
    var items50_70 = items.items50_70;
    var items70_100 = items.items70_100;
    var items100  = items.items100;
    var composition = items.composition;


}

var items50Template = _.template(document.getElementById('items50').innerHTML);
var contentItems50 = document.getElementById('items50div');


var resultItems50 = "";
items50.forEach(function (item) {
    resultItems50 += items50Template({
        id : item.id,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentItems50.innerHTML = resultItems50;


var items50_70Template = _.template(document.getElementById('items50_70').innerHTML);
var contentItems50_70 = document.getElementById('items50_70div');


var resultItems50_70 = "";
items50_70.forEach(function (item) {
    resultItems50_70 += items50_70Template({
        id : item.id,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentItems50_70.innerHTML = resultItems50_70;

var items70_100Template = _.template(document.getElementById('items70_100').innerHTML);
var contentItems70_100 = document.getElementById('items70_100div');


var resultItems70_100 = "";
items70_100.forEach(function (item) {
    resultItems70_100 += items70_100Template({
        id : item.id,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentItems70_100.innerHTML = resultItems70_100;

var items100Template = _.template(document.getElementById('items100').innerHTML);
var contentItems100 = document.getElementById('items100div');


var resultItems100 = "";
items100.forEach(function (item) {
    resultItems100 += items100Template({
        id : item.id,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentItems100.innerHTML = resultItems100;

var compositionTemplate = _.template(document.getElementById('itemscomposition').innerHTML);
var contentcomposition = document.getElementById('compositiondiv');


var resultcomposition = "";
composition.forEach(function (item) {
    resultcomposition += compositionTemplate({
        id : item.id,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentcomposition.innerHTML = resultcomposition;





