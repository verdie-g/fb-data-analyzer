const { decodeString } = require('../helpers/string');

function locationsDataFormat(locationsData) {
  locationsData.location_history = locationsData.location_history.map(location => (
    {
      date: new Date(location.creation_timestamp * 1000),
      coordinate: location.coordinate,
      name: decodeString(location.name),
    }
  ));

  return locationsData;
}

module.exports = {
  fileMatcher: { basePath: 'location', pattern: /^location_history.json$/ },
  format: locationsDataFormat,
};
