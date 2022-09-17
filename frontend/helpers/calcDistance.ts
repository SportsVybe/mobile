export const calcDistance = (
  userLat: number,
  userLng: number,
  lat: number,
  lng: number,
  unit: "K" | "M",
) => {
  if (userLat === lat && userLng === lng) {
    return 0;
  } else {
    var radUserLat = (Math.PI * userLat) / 180;
    var radLat = (Math.PI * lat) / 180;
    var theta = userLng - lng;
    var radTheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radUserLat) * Math.sin(radLat) +
      Math.cos(radUserLat) * Math.cos(radLat) * Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "M") {
      dist = dist * 0.8684;
    }
    return dist.toFixed(1);
  }
};
