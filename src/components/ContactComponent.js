import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component {
    
    constructor(props){
        super(props)

        this.state= {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched:{
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange =this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current state is ' + JSON.stringify(this.state));
        alert('Current state is ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur =(field) => (event) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }

    validate(firstname, lastname, telnum, email){
        const errors ={
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        }

        if (this.state.touched.firstname && firstname.length < 3){
            errors.firstname = 'First Name should > 3'
        }
        else if (this.state.touched.firstname && firstname.length > 10){
            errors.firstname = 'First Name should < 10'
        }

        if (this.state.touched.lastname && lastname.length < 3){
            errors.lastname = 'Last Name should > 3'
        }
        else if (this.state.touched.lastname && lastname.length > 10){
            errors.lastname = 'Last Name should < 10'
        }

        const reg = /^\d+$/ ;
        if (this.state.touched.telnum && !reg.test()){
            errors.telnum = 'Tel Num should only have number'
        }

        if (this.state.touched.email && email.split('').filter(x=>x==='@').length !==1){
            errors.email = 'Email should contain @'
        }

        return errors

    }

    render(){

        const errors = this.validate(this.state.firstname,this.state.lastname,this.state.telnum,this.state.email)


        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" href='/' className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send Us Your Feedback</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='firstname' md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input name='firstname' type='text' id='firstname' 
                                    placeholder='First Name' value={this.state.firstname} 
                                    valid={errors.firstname===''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')} onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.firstname}
                                    </FormFeedback>                           
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='lastname' md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input name='lastname' type='text' id='lastname' 
                                    placeholder='Last Name' value={this.state.lastname} 
                                    valid={errors.lastname===''}
                                    invalid={errors.lastname !== ''}
                                    onBlur={this.handleBlur('lastname')} onChange={this.handleInputChange} />                           
                                    <FormFeedback>
                                        {errors.lastname}
                                    </FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='telnum' md={2}>Tel Number</Label>
                                <Col md={10}>
                                    <Input name='telnum' type='tel' id='telnum' 
                                    placeholder='Tel Number' value={this.state.telnum} 
                                    valid={errors.telnum===''}
                                    invalid={errors.telnum !== ''}
                                    onBlur={this.handleBlur('telnum')} onChange={this.handleInputChange} />                           
                                    <FormFeedback>
                                        {errors.telnum}
                                    </FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='email' md={2}>E-Mail</Label>
                                <Col md={10}>
                                    <Input name='email' type='email' id='email' 
                                    placeholder='E-Mail' value={this.state.email} 
                                    valid={errors.email===''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')} onChange={this.handleInputChange} />                           
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6,offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type='checkbox' checked={this.state.agree} name='agree' onChange={this.handleInputChange} />{' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Input type='select' name='contactType' onChange={this.handleInputChange} value={this.state.contactType}>
                                    <option>Tel Number</option>
                                    <option>E-Mail</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='message' md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input name='message' type='textarea' id='message' placeholder='Enter Your Feedback' rows='12' value={this.state.message} onChange={this.handleInputChange} />                           
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={{size:10, offset:2}}>
                                    <Button type='submit' color='primary'>
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;