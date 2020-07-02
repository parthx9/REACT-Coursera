import React,{ Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';


class Detail extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('Detail Component mounted');
    }

    componentDidUpdate(){
        console.log('Detail Component updated');
    }
    
    renderComments(comments) {
        if (comments != null) {
          let options = { year: "numeric", month: "short", day: "numeric" };
          return comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </li>
            </ul>
          ));
        } 
        else
         return(
             <div></div>
         );
     }
    

    render (){


        console.log('Detail Component rendered');
        if (this.props.dish != null){
            return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-5 mt-5">
                        <Card>
                            <CardImg src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card> 
                    </div>
                    <div className="col-12 col-sm-5 mt-5">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            </div>
            )
        }else{
            return (
                <div>

                </div>
            )
        }
    }
}

export default Detail