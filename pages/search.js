import React from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useRouter  } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '@/lib/userData';
export default function Search() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const { register, handleSubmit, setValue, setError, watch, formState: {errors} } = useForm(

    );
    const router = useRouter();
  async function submitForm(data)
    {
        var querystring = data.searchBy+"=true"
        if(data.geoLocation)
        {
            querystring+= "&geoLocation="+data.geoLocation
        }
        if(data.medium)
        {
            querystring+= "&medium="+data.medium
        }
      
            querystring+= "&isOnView="+data.isOnView
            querystring+= "&isHighlight="+data.isHighlight
            querystring+= "&q="+data.q

            setSearchHistory(await addToHistory(querystring));
            router.push("/artwork?" + querystring);


    }
  return (
    <div><Form onSubmit={handleSubmit(submitForm)}>
    <Row>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter search query"
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={4}>
        <Form.Label>Search By</Form.Label>
        <Form.Select name="searchBy" className="mb-3">
          <option value="title">Title</option>
          <option value="tags">Tags</option>
          <option value="artistOrCulture">Artist or Culture</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Geo Location</Form.Label>
          <Form.Control type="text" placeholder="" name="geoLocation" />
          <Form.Text className="text-muted">
          Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
        </Form.Text>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Medium</Form.Label>
          <Form.Control type="text" placeholder="" name="medium"/>
          <Form.Text className="text-muted">
          Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
        </Form.Text>
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Check
          type="checkbox"
          label="Highlighted"
          name="isHighlight"
        />
        <Form.Check
          type="checkbox"
          label="Currently on View"
          name="isOnView"
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Col>
    </Row>
  </Form></div>
  )
}
