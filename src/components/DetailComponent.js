import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
  
      this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
    handleSubmit(values) {
      this.toggleModal()
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
      return (
        <div>
          <button
            className="btn btn-light border border-dark"
            onClick={this.toggleModal}
          >
            <span className='fa fa-pencil'></span>
            &nbsp; Submit comment
          </button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md={12}>
                    <Control.select
                      model=".rating"
                      id=".rating"
                      name=".rating"
                      className="form-control"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={12}>
                    Your Name
                  </Label>
                  <Col md={12}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      placeholder="Author Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "Required ",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>
                    Comment
                  </Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10 }}>
                    <Button type="submit" color="primary">
                      Send Feedback
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
    
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
    
    function RenderDish(props) {
        return (
            <Card>
            <CardImg src={baseUrl + props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>   
        )
    }


    
    const Detail = (props) =>{
      if (props.isLoading) {
            return (
              <div className='container'>
                <div className='row'>
                  <Loading />
                </div>
              </div>
            )
      }
      else if (props.errMess){
        return (
          <div className='container'>
            <div className='row'>
              <h4>{props.errMess}</h4>
            </div>
          </div>
        )
      }
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                    /> 
                    <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                </div>
            </div>
            </div>
        );
    }


export default Detail