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
    var itemsFlow = items.itemsFlow;
}

var itemTemplate = _.template(document.getElementById('items').innerHTML);
 console.log(itemTemplate);
var contentItems = document.getElementById('catalog_grid');


var resultItems = "";
itemsFlow.forEach(function (item) {
    resultItems += itemTemplate({
        id : item.id,
        cat: item.cat,
        img: item.img,
        name: item.name,
        specification: item.specification,
        price: item.price
    })
});
contentItems.innerHTML = resultItems;


