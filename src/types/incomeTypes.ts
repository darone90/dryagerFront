export interface Income {
    coolingModule1: string;
    coolingModule2: string;
    pumpModule: string;
    ventModule: string;
    drying: string;
    message: string;
}

export interface HumiData {
    humiSetPoint: number;
    humiTolleracne: number;
    humiActiveTime: number;
    humiInterval: number;
}