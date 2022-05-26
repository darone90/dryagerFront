import { address } from "./address";

export const getData = async (path: string) => {
    const data = await fetch(`${address}/${path}`);
    const decoded = await data.json();
    return decoded

}



