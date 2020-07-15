import React, { Component } from 'react';
import Menu from './MenuComponent';
import Detail from './DetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) =>{
  return {
    dishes: state.dishes,
    comments : state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
})


class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const DishWithId = ({match}) => {
      return(
          <Detail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}/>
      );
    };
    const HomePage = () => {
      return(
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          disheserrMess = {this.props.dishes.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />


              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes.dishes}
                isLoading = {this.props.dishes.isLoading}
                errMess = {this.props.dishes.errMess}  />} />


              <Route path='/menu/:dishId' component={DishWithId} />


              <Route exact path='/contactus' component={() => <Contact 
              resetFeedbackForm={this.props.resetFeedbackForm} />} />


              <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders.leaders} />} />

              
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)) ;