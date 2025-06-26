 map.setCenter(coordinates);
//  const map = new maplibregl.Map({
//     container: 'map',
//     style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=w1HAUUh7KSNd2exHpP53',
//     center: [77.2088,28.6139],
//     zoom: 11
//   });
  console.log(window.coordinates);

  map.addControl(new maplibregl.NavigationControl());

  new maplibregl.Marker({ color: "red" })
    .setLngLat([lng, lat])
    .addTo(map);

