const replaceSpacesWithPlus = (string) => {
  return string.replace(/ /g, '+');
};

const getRandom = async (pointA, pointB) => {
    console.log('web')
  console.log("calculateDistance:", pointA, pointB);
  
  if (pointA && pointB) {
    const apiKey = 'AIzaSyA1f3z5AMyYu7ImdMxq21YYR3QSjAngGeE';
    const PointANew = replaceSpacesWithPlus(pointA);
    const PointBNew = replaceSpacesWithPlus(pointB);
    console.log("calculateDistance:", pointA, pointB);
    const url = `http://localhost:3006/calculateDistance?pointA=${PointANew}&pointB=${PointBNew}`;

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
