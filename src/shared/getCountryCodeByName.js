import countryCodesData from './CountryCodes.json'

const getCountryCodeByName = (countryName) => {
  const countryObject = countryCodesData.find(
    (country) => country.Name.toLowerCase() === countryName.toLowerCase()
  );
  
  if (countryObject) {
    return countryObject.Code.toLowerCase();
  } else {
    return null;
  }
}

export default getCountryCodeByName;