import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, 
    Breadcrumb,
    BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem ({dish, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

    const Menu = (props) => {

        const menu = props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1"  key={dish.id}>
                    <RenderMenuItem dish ={dish} />
                </div>
            );
        });

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else return (
            <div className="container">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;