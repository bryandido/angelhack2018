var users={
  1:{
    lat: 36.5486997,
    long: -122.0589753
  },
  2:{
    lat: 37.5486997,
    long: -123.0589753
  }
};

function addUser(user){
  if (user){
    users.push(user);
  }
}

function myMap(user) {
    if (user)
      addUser(user);
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(37.5486997,-122.0589753); 
    
    // initialize all the markers with the user objects
    var centers = [];
    var markers = [];
    Object.keys(users).map((v,i)=>{
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