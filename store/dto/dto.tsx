import { ServerMachine } from "../../domain";
import { DropdownData } from "@/components/dropdown";

export interface GoogleSheetsResponseDto {
    range: string;
    majorDimension: string;
    values: string[][];
}
