const API_KEY = 'AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE';
const SHEET_ID = '1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc';

export const API_URL = (sheet: 'machine-make' | 'machine-model' | 'roasters' | 'blends' | 'popup-tips') => `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`