import { GOOGLE_SHEET_ID, GOOGLE_API_KEY } from '@env';

export const API_URL = (sheet: 'machine-make' | 'machine-model' | 'roasters' | 'blends' | 'popup-tips') => `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheet}?valueRenderOption=FORMATTED_VALUE&key=${GOOGLE_API_KEY}`