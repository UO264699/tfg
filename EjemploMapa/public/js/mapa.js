
var parques = L.layerGroup();

var map = L.map('map', {


    touchZoom: true


}).setView([43.1670574137308,-5.757725632114272],10);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(map);

L.geoJson(marcadores, {
    pointToLayer: function (feature, latlng) {

        return L.marker(latlng, {highlight: 'temporary'});
    },
    onEachFeature: onEachFeature
}).addTo(parques).addTo(map);


var abierto = false;

map.setMaxBounds([43.1670574137308,-5.757725632114272]);

console.log(parques.getLayers()[0]);
var sidebar = L.control.sidebar('sidebar').addTo(map);

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.name,{autopan : true});

    layer.on('mouseover', function(e) {

        this.openPopup();

    });
    layer.on('mouseout', function(e) {
        this.closePopup();
    });

    layer.on('click',function (e) {

        if(!abierto){

            abrirInformacion(feature.properties.name, feature.properties.imagen);
            abierto = true;
        }
        else{
            sidebar.close();
            abierto = false;
        }

    });

};

function abrirInformacion(parque,imagen){

    sidebar.open('infoid');

    document.getElementById("info").innerHTML = '<h1>' + parque + '</h1>' + '<img class="img-fluid" src=' + imagen +'>';
}

function volar(nombre){

    for(m in marcadores){

        if (marcadores[m].properties.name == nombre){

            map.flyTo([marcadores[m].geometry.coordinates[1],marcadores[m].geometry.coordinates[0]],14);
            sidebar.close();

            parques.bindPopup(feature.properties.name,{autopan : true});
            parques.openPopup();


            //abrirInformacion(marcadores[m].properties.name,marcadores[m].properties.imagen);
        }
    }
}



//Creo un marcador haciendo click

/**
map.on('click', function(ev) {

    var marker = L.marker(ev.latlng).addTo(map);

    var lat = ev.latlng.toString().split(')')[0].split('(')[1].split(',')[0];
    var lon = ev.latlng.toString().split(')')[0].split('(')[1].split(',')[1];

    $("#lat").val(lat);
    $("#lon").val(lon);

    $('.btn-guardar').click();


});
**/