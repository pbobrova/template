import { useEffect, useState } from "react";
import { SongCardValues, TopSongCard } from "./TopSongCard";
import { getRandomPictures, getTopSongs } from '../../collectData';
import image from '../../images/topSinger.jpg'

/**
 * @returns ReactElement со списком карточек лучших треков
 */
export const TopSongsList = () => {
    
    const [topSongs, setTopSongs] = useState<SongCardValues[]>([]);

    async function setSongsName() {
        let names = await getTopSongs(12);
        let arr = [];
        if (names === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr.push({key: i, name: names[i].name, artist: names[i].artist, pic: image, picAlt: names[i].name});
        }
        return arr;
    }

    async function setPic(arr: SongCardValues[] | undefined) {
        let pictures = await getRandomPictures(12, 150);
        if (pictures === undefined || arr === undefined)
            return;
        for(let i = 0; i < 12; i++){
            arr[i].pic = pictures[i];
        }
    }

    useEffect(() => {
        async function qwe() {
            let arr = await setSongsName();
            if(arr !== undefined)
                setTopSongs(arr);
            await setPic(arr);
            if(arr !== undefined)
                setTopSongs([...arr]);
        }
        qwe();
    }, []);

    return(
        <div className='topic'>
            <h2 className='topic-header'>Popular tracks</h2>
            <div className='center'><hr className='red-line'/></div>
            <div className='top-tracks'>
            {}
                { topSongs.map((a) => {
                    return <TopSongCard key={a.key} name={a.name} artist={a.artist} pic={a.pic} picAlt={a.picAlt}/>
                }) }
            </div>
        </div>
    )
}