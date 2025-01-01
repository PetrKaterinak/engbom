import {jwtDecode} from "jwt-decode";

export const durationToTime = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}

// format bytes as human-readable text
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedBytes = (bytes / Math.pow(k, i)).toFixed(decimals);

    return `${formattedBytes} ${sizes[i]}`;
}

export const isBase64 = (str) => {
    // Regular expression to check if the string is a base64 string
    const base64Regex = /^(data:)?(.*?);(?:.*?),(.*)$/;
    return base64Regex.test(str);
}

export const moveItemUp = (arr, index) => {
    if (index > 0 && index < arr.length) {
        const temp = arr[index - 1];
        arr[index - 1] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

export const moveItemDown = (arr, index) => {
    if (index >= 0 && index < arr.length - 1) {
        const temp = arr[index + 1];
        arr[index + 1] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

export const formatDate = (date, format = 'd.m.Y H:i:s') => {
    if (!(date instanceof Date) && typeof date !== 'string') {
        return '';
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const monthsShort = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čvn", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"];
    const monthsFull = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"];
    const daysShort = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
    const daysFull = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    return format.replace(/Y|y|m|n|d|j|H|i|s|M|F|l|D/g, (match) => {
        switch (match) {
            case 'Y':
                return date.getFullYear();
            case 'y':
                return String(date.getFullYear()).slice(-2);
            case 'm':
                return String(date.getMonth() + 1).padStart(2, '0');
            case 'n':
                return String(date.getMonth() + 1);
            case 'd':
                return String(date.getDate()).padStart(2, '0');
            case 'j':
                return String(date.getDate());
            case 'H':
                return String(date.getHours()).padStart(2, '0');
            case 'i':
                return String(date.getMinutes()).padStart(2, '0');
            case 's':
                return String(date.getSeconds()).padStart(2, '0');
            case 'M':
                return monthsShort[date.getMonth()];
            case 'F':
                return monthsFull[date.getMonth()];
            case 'l':
                return daysFull[date.getDay()];
            case 'D':
                return daysShort[date.getDay()];
            default:
                return match;
        }
    });
}

export const uuid = () => {
    // Create an array with 16 positions and fill it with random values
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const getLoggedUsername = () => {
    return jwtDecode(localStorage.getItem('token')).username;
}

export const getLoggedUserId = () => {
    return jwtDecode(localStorage.getItem('token')).user_id;
}