function GetLocation() {

    var geocoder = new google.maps.Geocoder();
    var address = arrIndirizzi[arrIndirizzi.length - 1]; //Last item of arrIndirizzi[]

    //Google Geocoding API
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();

            alert(
                'Indirizzo: ' + address + '\n' +
                'Latitudine: ' + latitude + '\n' +
                'Longitudine: ' + longitude
            );
            console.log(results);
        } 

    });

};

var uploadedCSV = document.getElementById('uploadFile');
var uploadBtn = document.getElementById('test');
var arrIndirizzi = [];
uploadBtn.addEventListener('click', function(){
    //Papaparse convert CSV to JSON
    Papa.parse(
        uploadedCSV.files[0], 
        {
            download: true,
            header: true, //Header of CSV file
            skipEmptyLines: true,
            complete: function(results){

                //debugger;
                
                //Push each address into arrIndirizzi[]
                for (var i = 0; i < results.data.length; i++) {
                    arrIndirizzi.push(results.data[i].Indirizzi);
                    GetLocation();
                };

            }
        }
    )
});