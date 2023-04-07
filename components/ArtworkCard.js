import React from 'react';
import Error from 'next/error';
import Link from 'next/link';
import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ArtworkCard(prop) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${prop.objectID}`);
    
  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }
  
  const Dat = data;
  
  return (
    <>
      <Card style={{ width: '18rem' }}>
        {Dat.primaryImageSmall ? (
          <Card.Img src={Dat.primaryImageSmall} />
        ) : (
          <Card.Img
            src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          />
        )}
        <Card.Body>
          {Dat.title ? (
            <Card.Title>{Dat.title }</Card.Title>
          ) : (
            <Card.Title>N/A</Card.Title>
          )}

          <Card.Text>
          <b>Date: </b>{Dat.objectDate || 'N/A'}
            <br />
            <b> Classification: </b>{Dat.classification || 'N/A'}
            <br />
            <b> Medium: </b>{Dat.medium || 'N/A'}
       
          </Card.Text>

          <Link href={`/artwork/${prop.objectID}`} passHref legacyBehavior> 
            <Button variant="primary">Id: {prop.objectID} </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
