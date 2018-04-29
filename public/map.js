var users={
  /*
  1:{
    lat: 37.5486997,
    long: -122.0589753
}*/
};

function myMap(user) {
    console.log(user)
    if (user){
      users[Object.keys(user)[0]] = user[Object.keys(user)[0]];
      console.log(users)
      var center = new google.maps.LatLng(Object.keys(user)[0]['lat'],Object.keys(user)[0]['long']);
      var center = new google.maps.LatLng(user['lat'],user['long']);
      var marker = new google.maps.Marker({position : center,animation: google.maps.Animation.BOUNCE});
      marker.setMap(map);
    }
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(37.5486997,-122.0589753); 
    
    // initialize all the markers with the user objects
    var centers = [];
    var markers = [];
    Object.keys(users).map((v,i)=>{
      console.log(v);
      console.log(users[v]);
      centers.push(new google.maps.LatLng(users[v].lat,users[v].long));
      markers.push(new google.maps.Marker({position : centers[i],animation: google.maps.Animation.BOUNCE}));
    });
    
    var mapOptions = {center: myCenter, zoom: 12};
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
      position: myCenter,
      animation: google.maps.Animation.BOUNCE
    });

    markers.map((v,i)=>{
      v.setMap(map);
    });
    //marker.setMap(map);
  }
