import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

    
    function RenderComments(props) {
          let options = { year: "numeric", month: "short", day: "numeric" };
          return props.comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </li>
            </ul>
          ));
          }
    
    function RenderMenu(props) {
        return (
            <Card>
            <CardImg src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>   
        )
    }
    
    const Detail = (props) =>{
            if (props.dish != null){
            return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-5 mt-5">
                        <RenderMenu dish={props.dish} />
                    </div>
                    <div className="col-12 col-sm-5 mt-5">
                        <RenderComments comments= {props.dish.comments} />
                    </div>
                </div>
            </div>
            )
            }
            else{
            return (
                <div>

                </div>
            )
        }
    }


export default Detail