import React from 'react'
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCard from "@/components/ArtworkCard";

import Card from 'react-bootstrap/Card';
import { Row, Col } from "react-bootstrap";
export default function favourites() {
  const [favouriteList, setFavouriteList] = useAtom(favouritesAtom)

  if (!favouriteList) {
    return null;
  }
  return (
    <div>

<Row className="gy-4">
{favouriteList.length > 0 ? (
    favouriteList.map(currentObjectID => (
      <Col lg={3} key={currentObjectID}>
        <ArtworkCard objectID={currentObjectID} />
      </Col>
    ))
  ) :(

          <Card style={{ width: '44rem',textAlign: "center"  }}>
          
            <Card.Body>
              <h4>"Nothing Here Try adding some new artwork to the list."</h4>
            </Card.Body>
          </Card>
        )}
        </Row>

    </div>
  )
}
