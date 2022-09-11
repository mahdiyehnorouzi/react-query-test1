import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Character from './Character';

export default function Characters() {

    const [page, setPage] = useState(1);

    const fetchCharacters = async ({queryKey}) => {
        console.log(page);
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(queryKey[1] - 1) * 10}`).then(res => res.json());
        console.log(response);
        return response;
    }

    const {data, status, isError, isLoading} = useQuery(['characters', page], fetchCharacters, { keepPreviousData : true} );

    const prevPage = () => {
        if (page === 1 ) return;
        setPage(page => page - 1)
    }

    const nextPage = () => {
        if (data.total <= (page * 10) ) return;
        setPage(page => page + 1)
    }
 
    if(isLoading){ //or use status === "loading"
        return <div>Loading...</div> 
    }

    if(isError){
        return <div>Error</div>
    }
  return (
    <div>
        {data.products.map((item) => (
            <div style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'center'
            }}>
               <Character key={item.id} character={item}/>
            </div>
        )
            )}
            <button disabled={page === 1} onClick={prevPage}>prev</button>
            <button disabled={data.total <= (page * 10)} onClick={nextPage}>next</button>
    </div>
  )
}
