import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type GenreResponseProps = {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

type MovieProps = {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

type MoviesContextProps = {
    genres: GenreResponseProps[];
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    movies: MovieProps[];
    handleClickButton: (id: number) => void;
}

export const MoviesContext = createContext({} as MoviesContextProps)

type MoviesContextProviderProps = {
    children: ReactNode;
}

export function MoviesContextProvider({ children }: MoviesContextProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <MoviesContext.Provider
            value={{
                genres,
                movies,
                selectedGenre,
                selectedGenreId,
                handleClickButton,
            }}
        >
            {children}
        </MoviesContext.Provider>
    )
}

// otimização da chamada
export const useMovies = () => {
    return useContext(MoviesContext)
}
