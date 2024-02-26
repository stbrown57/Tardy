/**
 * Some funtions that can possibly be used in other scripts in the SCPS environment
 * and genrically.
 */

/**
 * Ingest contents from CSV or Sheets files identified by
 * Google file object IDs. An array of arrays is returned 
 * as data.
 * 
 * @param {string} Google object ID
 * @return {array} Records returned as an array
 */
function ingestFile(fileId) {
  const file = DriveApp.getFileById(fileId);
  const fileName = file.getName();
  const fileType = file.getMimeType();
  const fileSize = file.getSize();
  if (fileType == 'application/octet-stream') {
    var data = Utilities.parseCsv(file.getBlob().getDataAsString());
  }
  console.log(fileName);
  console.log(fileSize);
  console.log(fileType);

  return data;
}
/**
 * Convert an arary of arrays (ingested CSV data) into an array of objects.
 * Object properties are determined by the first array (Headers)
 */
function convertCsvToObjects(csvData) {
  // Extract header and remove empty lines
  const header = csvData[0];
  // Initialize an array to store the resulting objects 
  const result = [];
  // Iterate through each line starting from index 1 (skipping the header)
  for (let i = 1; i < csvData.length; i++) {
    const currentLine = csvData[i];
    // Initialize an object to store key-value pairs
    const obj = {};
    // Iterate through each value in the current line
    for (let j = 0; j < header.length; j++) {
      // Assign the value to the corresponding key from the header
      obj[header[j].replace(/\s/g, "")] = currentLine[j];
    }
    // Add the object to the result array
    result.push(obj);
  }
  return result;
}


