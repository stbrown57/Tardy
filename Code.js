/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Object DB 
 * https://www.outsystems.com/blog/posts/moving-from-relational-to-non-relational-databases/
 * 
 * Change this to "CardServices"
 * 
 */

// [START picker_code]
/**
 * Creates a custom menu in Google Sheets when the spreadsheet opens.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu('Tardy')
      .addItem('Import Roster', 'selectRosterCSV')
      .addToUi();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
/** 
 * This function should return the id selected in the HTML page. I think it is
 * a callback with a special gscript run function.
 * @return {string} Output File id property.
*/
function selectRosterCSV() {
  var whatData = 'Roster'
  try {
    const html = HtmlService.createHtmlOutputFromFile('RosterSelect.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    SpreadsheetApp.getUi().showModalDialog(html, 'Select a '+ whatData + ' file');
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  try {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  } catch (e) {
    // TODO (Developer) - Handle exception
    console.log('Failed with error: %s', e.error);
  }
}
// [END picker_code]

/**
 * This function processes the file id attribute passed as a parameter
 * and returns the data as a two dimentional string array (array of arrays). 
 * The file type could be either text/csv, application/octet-stream, or 
 * a spreadsheet depending on the Google Drive settings of the user.
 * @param {String} text File asset id.
 * @return {String} Output Data array of arrays
*/
function rosterCVS() {
  try {
    const id = "1CtqDc4VyRGhykISR3hiYYvfaQcugPZVs";
    rosterData = ingestFile(id);
    //console.log(rosterData);
  } catch (e) {
    console.log('Failed with error: %s', e.error);
  }
  //console.log(rosterData);
  try {
    students = convertCsvToObjects(rosterData);
    //console.log(students);
  } catch (e) {
    console.log('Failed with error: %s', e.error);
  }
  console.log(students);
}

function tardyCVS() {
  try {
    const id = "1CtqDc4VyRGhykISR3hiYYvfaQcugPZVs";
    rosterData = ingestFile(id);
    //console.log(rosterData);
  } catch (e) {
    console.log('Failed with error: %s', e.error);
  }
  console.log(rosterData);
}
