import axios from 'axios';
import { useEffect, useState } from "react";
import { MachineResponseDto } from "@/app-data/data/remote/google-sheets/dto";
import { Machine } from "@/types";
import { dtoToMachines } from "@/app-data/data/remote/google-sheets/transform";

// https://sheets.googleapis.com/v4/spreadsheets/1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE

const API_KEY = 'AIzaSyDdjwrdiL2aWbCaZb8PPi-fbNw5DqJtxTE';
const SHEET_NAME = 'Sheet1'
const SHEET_ID = '1q8onki1uoZgprYpWYovQk9amv7dSdJtV0zmCDWSzvCc';

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

async function fetchMachinesAsync(): Promise<MachineResponseDto | undefined> {
    try {
        const response = await axios.get(API_URL);
        return response.data
    } catch (error) {
        console.error('Error fetching machines:', error);
        return undefined
    }
}

export default function useFetchMachines(): [boolean, Machine[], Error | null] {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState<Machine[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchMachinesAsync()
            .then(data => {
                setData(data ? dtoToMachines(data) : [])
                setLoaded(true)
            })
            .catch(setError)
    },[])

    return [loaded, data, error]

}