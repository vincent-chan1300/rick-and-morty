export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

interface ApiEndpoints {
    characters: string;
    locations: string;
    episodes: string;
}

interface Characters {
    info: Info;
    results: Result[];
    error: string;
}

interface Info extends Characters {
    count: number;
    pages: number;
    next: string;
    prev: string;

}

interface Result {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
    error: string;
}
interface EpisodeData {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

interface LocationData {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

interface Error {
    error: string
}

interface Origin extends Result {
    name: string;
    url: string;
}

interface Location extends Characters {
    name: string;
    url: string;
}