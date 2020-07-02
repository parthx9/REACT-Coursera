import React, { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';


class Menu extends Component{

    constructor(props){
        super(props);
        this.state ={
            selectedDish : null
        };

        }

        render(){
            const menu = this.props.dishes.map((dish)=>{
                return (
                    <div className="col-12 col-sm-5 mt-5">
                        <Card onClick={() => this.props.onClick(dish.id)} key={dish.id}>
                            <CardImg width='100%' src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
                );
            });

            return(
                <div className="container">
                    <div className="row">
                        {menu}
                    </div>
                </div>
            )
        }
    }
export default Menu;