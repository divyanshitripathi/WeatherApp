import API_KEY from "../utils/constant";

const fetchWeatherData = async ({ latitude, longitude, city }) => {
  const responseFunction = async (response) => {
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      alert(`Either location is not allowed or City is not Found`);
      return null;
    }
  };
  try {
    let response;
    if (city) {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
    } else {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
    }
    return await responseFunction(response);
  } catch (e) {
    console.log("Error fetching weather data:", e);
    return null;
  }
};

export default fetchWeatherData;
