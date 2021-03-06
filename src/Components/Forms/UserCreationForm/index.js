import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser } from '../../../Redux/Actions/Users';
import { toggleLogInModal } from '../../../Redux/Actions/Pages';

class UserCreationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: '',
      trySubmitted: false
    }

    this.submitHandler = this.submitHandler.bind(this);

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.password2ChangeHandler = this.password2ChangeHandler.bind(this);

    this.getEmailStyle = this.getEmailStyle.bind(this);
    this.getPasswordStyle = this.getPasswordStyle.bind(this);
    this.getPassword2Style = this.getPassword2Style.bind(this);

    this.renderStatus = this.renderStatus.bind(this);

    this.renderSpinner = this.renderSpinner.bind(this);
  }

  submitHandler(e) {
    const { createUser } = this.props;
    e.preventDefault();
    this.setState({
      trySubmitted: true
    });
    const { email, password, password2 } = this.state;
    createUser(email, password, password2);
  }

  emailChangeHandler(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  passwordChangeHandler(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  password2ChangeHandler(e) {
    const password2 = e.target.value;
    this.setState({ password2 });
  }

  getEmailStyle() {
    const { trySubmitted } = this.state;
    const { creatingUserError } = this.props;
    if ( trySubmitted ) {
      if ( creatingUserError && creatingUserError.type === "email" ) {
        return {
          border: '1px solid red'
        }
      }
      // else {
      //   return {
      //     border: '1px solid green'
      //   }
      // }
    }
  }

  getPasswordStyle() {
    const { trySubmitted } = this.state;
    const { creatingUserError } = this.props;
    if ( trySubmitted ) {
      if (creatingUserError && creatingUserError.type === "password" ) {
        return {
          border: '1px solid red'
        }
      } 
    }
  }

  getPassword2Style() {
    const { trySubmitted } = this.state; 
    const { creatingUserError } = this.props;
    if ( trySubmitted ) {
      if (creatingUserError && creatingUserError.type === "password2" ) {
        return {
          border: '1px solid red'
        }
      } 
    }
  }

  renderStatus() {
    const { trySubmitted } = this.state;
    const { creatingUserError, creatingUserSucces, toggleLogInModal } = this.props;
    if ( trySubmitted ) {
      if ( creatingUserError ) {
        return (
          <React.Fragment>
            <Alert key={1} color="danger">{creatingUserError.message}</Alert>
            {creatingUserError.message.includes("Please try to log in") ? (
              <p onClick={toggleLogInModal} className="text-decoration-link">Log in</p>
            ) : null}
          </React.Fragment>
        );
      } else if (creatingUserSucces) {
        return <Alert key={1} color="success">{creatingUserSucces}</Alert>;
      }
    }
  }

  renderSpinner() {
    const { creatingUser } = this.props;
    if ( creatingUser ) {
      return <Spinner color="primary" className="ml-2" />
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.submitHandler}>
          <FormGroup >
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={this.emailChangeHandler}
              style={this.getEmailStyle()}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Passowrd"
              onChange={this.passwordChangeHandler}
              style={this.getPasswordStyle()}
            />
        </FormGroup>
        <FormGroup>
          <Label for="password2">Repeat Password</Label>
          <Input
            type="password"
            name="password2"
            id="password2"
            placeholder="Repeat password" 
            onChange={this.password2ChangeHandler}
            style={this.getPassword2Style()} 
          />
        </FormGroup>
        <div>
          <Button>Submit</Button>
          {this.renderSpinner()}
        </div>
        </Form>
        <div className="mt-4">
          {this.renderStatus()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  creatingUser: state.users.creatingUser,
  creatingUserError: state.users.creatingUserError,
  creatingUserSucces: state.users.creatingUserSucces
});

const mapDispatchToProps = dispatch => bindActionCreators({ createUser, toggleLogInModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserCreationForm);