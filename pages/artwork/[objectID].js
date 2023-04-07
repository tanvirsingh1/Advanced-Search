import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';

export default function ObjectID() {
    const router = useRouter()

  const { objectID } = router.query
  return (
<>
<Row>
 <Col>
 <ArtworkCardDetail objectID={objectID} />
 </Col>
</Row>
</>
  )
}
