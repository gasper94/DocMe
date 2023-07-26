const replaceSpacesWithPlus = (string) => {
  return string.replace(/ /g, '+');
};

const getRandom = async (pointA, pointB) => {
    console.log('native')
  console.log("calculateDistance:", pointA, pointB);
  
  if (pointA && pointB) {
    const apiKey = process.env.GOOGLE_API;
    const PointANew = replaceSpacesWithPlus(pointA);
    const PointBNew = replaceSpacesWithPlus(pointB);
    console.log("calculateDistance:", pointA, pointB);
    const url = `http://10.0.0.140:3006/calculateDistance?pointA=${PointANew}&pointB=${PointBNew}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('data', data);

        const distance = data.randomObject.distance;

        return distance;
    } catch (error) {
      console.log('Error calculating distance:', error);
    }
  }
  };

export { getRandom };
