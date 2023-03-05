export const fetchApi = async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
};


export const fetchLocationCharacter = async (list: any[]) => {
    const result = await Promise.all(list?.map((item, index) => {
        return fetchApi(item)
    }))

    return result;
}