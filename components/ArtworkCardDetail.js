import React, { useEffect,useState } from 'react';
import Error from 'next/error';
import Link from 'next/link';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import Card from 'react-bootstrap/Card';
import { favouritesAtom } from '@/store';
import Button from "react-bootstrap/Button";
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
export default function ArtworkCardDetail(prop) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);
  useEffect(()=>{  
    setShowAdded(favouritesList?.includes(prop.objectID)) }, [favouritesList]) 
  
    
  async function favouritesClicked(){
    if(showAdded)
    {
      setFavouritesList(await removeFromFavourites(prop.objectID))
      setShowAdded(false)
    }
    else{
      setFavouritesList(await addToFavourites(prop.objectID))
      setShowAdded(true)

    }

  }
  
  const { data, error } = useSWR(prop.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}`: null);
    
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }
  
  const Dat = data;

  


  return (
    <>
      <Card style={{ width: '80rem' }}>
        {Dat.primaryImage && 
          <Card.Img src={Dat.primaryImage} />
        }
        <Card.Body>
          {Dat.title ? (
            <Card.Title>{Dat.title }</Card.Title>
          ) : (
            <Card.Title>N/A</Card.Title>
          )}

          <Card.Text>
         <b>Date: </b> {Dat.objectDate || 'N/A'}
            <br />
            <b>  Classification: </b> {Dat.classification || 'N/A'}
            <br />
            <b> Medium: </b> {Dat.medium || 'N/A'}
            <br />
            <br />
            <b>   Artist: </b>{Dat.artistDisplayName|| 'N/A'}&nbsp;
            {Dat.artistDisplayName&&
            <a href={Dat.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>
            }
            <br />
            <b>  CreditLine: </b>{Dat.creditLine || 'N/A'}
            <br />
            <b>   Dimensions: </b>{Dat.dimensions || 'N/A'}
          <br /><br />
            {showAdded == true ? (
              <Button variant="dark" onClick={favouritesClicked}>
                + Favourite (added)
              </Button>
            ) : (
              <Button variant="outline-dark" onClick={favouritesClicked}>
                + Favourite
              </Button>
            )}
          </Card.Text>

      
        </Card.Body>
      </Card>
    </>
  );
}
