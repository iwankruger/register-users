import React/*, { Props }*/ from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormProps, WrappedFieldProps } from 'redux-form';
import { fetchUserDetail, addOrUpdateUser } from '../actions';
import { StoreState } from '../reducers';
import { UsersStateInterface } from '../reducers/usersReducer';


interface AppProps {
    userData: UsersStateInterface;
    fetchUserDetail: Function; // bypass redux-thunk returning a function and typescript complaining about type
    addOrUpdateUser: Function; // bypass redux-thunk returning a function and typescript complaining about type
    match?: { params?: any };
    history?: any;
}

interface AppState {
    fetching: boolean;
}

interface FormFieldsInterface {
    name: string;
    surname: string;
    email: string;
}

//class UsersAddOrEdit extends React.Component<InjectedFormProps, {}> {
// class UsersAddOrEdit extends React.Component<InjectedFormProps> {
class UsersAddOrEdit extends React.Component<InjectedFormProps & AppProps> {
    componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            console.log("user selected id = ", this.props.match.params.id);
            const id = this.props.match.params.id;
            if(!isNaN(id)) this.props.fetchUserDetail(this.props.match.params.id);
            
            //this.setState({userId: this.props.match.params.id})
        }
    
        console.log("DDDDD ", this.props);
        //this.setState({initialValues: {name: 'hello'}});
    }

    renderField(field: any) {
        // es6 for to pull properties from object
        // ie: now just have to use touched instead of field.meta.touched
        // and error instead of field.meta.error
        const {
            meta: { touched, error },
        } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        // field is an event handler
        // ...field.input JSX for
        // onChange={field.input.onChange}
        // onFocus={field.input.onFocus}
        // onBlur={field.input.onBlur}
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">{touched ? error : ""}</div>
            </div>
        );
    }

    onSubmit = async (values: any) => {
        //event.preventDefault();
        console.log('onSubmit');
        console.log(values);
        console.log(this.props);

        const user = { ...values, id: this.props.userData.user.id };
        console.log(user);

        await this.props.addOrUpdateUser(user, () => {
            this.props.history.push('/users');
        });
  
    }

    render() {
        const { handleSubmit } = this.props;

        //const UsersAddOrEdit = () => {
        return (
            <form 
             
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Name"
                    name="name"
                    //component="input" type="text"
                    component={this.renderField}
                />
                <Field
                    label="Surname"
                    name="surname"
                    component={this.renderField}
                />
                <Field
                    label="Email"
                    name="email"
                    component={this.renderField}
                />
                <div className="text-xs-right">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/users" className="btn btn-danger">Cancel</Link>
                </div>
            </form>
        );
    }
}


interface FormFieldsInterface {
    name: string;
    surname: string;
    email: string;
}

// will be called automatically when form is submit
function validate(values: any): {} {  
    const errors: {[key: string]: any} = {};
  
    // validate values
    if (!values.name) {
      errors.name = 'Enter a name';
    }
  
    if (!values.surname) {
      errors.surname = 'Enter a surname';
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(values.email).toLowerCase())) {
        errors.email = 'Enter a valid email address';
    }

  
    // if errors object is empty, the form is fine to submit
    // if errors has any properties, redux assumes the form
    // is invalid
    return errors;
  }


const mapStateToProps = (state: StoreState): { userData: UsersStateInterface, initialValues: {} } => {
    console.log('DDDDD ',state)
    console.log('DDDDD ',state.userData.user.name)
    return { 
        userData: state.userData,
        initialValues: {
            name: state.userData.user.name,
            surname: state.userData.user.surname,
            email: state.userData.user.email
        }
     };
};

// the following method of connecting reduxForm 
// with connected worked However the props were not passed down to the reduxForm
// export default reduxForm({
//     form: 'UserDetailsForm',
//     enableReinitialize: true,
//     initialValues: {name: 'hello'}
//   })(connect(mapStateToProps, { fetchUserDetail })(UsersAddOrEdit));

const reduxFormInstance = reduxForm<any, any>({
    form: 'UserDetailsForm',
    enableReinitialize: true,
    validate,
    //initialValues: {name: 'hello'}
  })(UsersAddOrEdit);

export default connect(mapStateToProps, { fetchUserDetail, addOrUpdateUser })(reduxFormInstance)

  
