const API_KEY = 'AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE';
const MACHINES = 'machines'
const BEANS = 'beans'
const SHEET_ID = '1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc';

export const API_URL = (sheet: 'machines' | 'beans') => `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheet}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`