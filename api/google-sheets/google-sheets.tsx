import axios from 'axios';
import { DropdownData, Machine } from "@/types";

// https://sheets.googleapis.com/v4/spreadsheets/1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE

const API_KEY = 'AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE';
const SHEET_NAME = 'Sheet1'
const SHEET_ID = '1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc';

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

export interface Response {
    range: string;
    majorDimension: string;
    values: string[][];
}

export async function fetchMachines() {
    try {
        const response = await axios.get(API_URL);
        const data: Response = response.data
        const keys: string[] = data.values[0]
        const vals: string[][] = data.values.slice(1);
        return vals.map((val) => Object.assign({}, ...keys.map((k, i) =>
            ({[k]: val[i]}))))
    } catch (error) {
        console.error('Error fetching users:', error);
        return undefined
    }
}

export function machineMakeToKeyValue(machines: Machine[] | undefined): DropdownData[] | undefined {
    if (!machines) return undefined

    let uniqueMake = machines.map(machine => machine.make)
    uniqueMake = [...new Set(uniqueMake)];

    return uniqueMake.map(machine => {
        return {label: machine, value: machine};
    })
}