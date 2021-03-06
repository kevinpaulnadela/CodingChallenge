const objectToCsv = function(items) {
  // Empty array to push in to CSV
  const csvRows = [];

  // Getting the headers for CSV at comma separated format
  const headers = Object.keys(items[0]);
  csvRows.push(headers.join(','));

  // Loop for the rows
  for (const row of items) {
    // Mapping the data into the headers
    const values = headers.map(header => {
      // Forcing the value into string to replace/escape quotes
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
}
module.exports = objectToCsv;