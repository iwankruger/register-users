import React/*, { Props }*/ from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormProps, WrappedFieldProps } from 'redux-form';
import { fetchUserDetail } from '../actions';
import { StoreState } from '../reducers';
import { UsersStateInterface } from '../reducers/usersReducer';


interface AppProps {
    userData: UsersStateInterface;
    fetchUserDetail: Function; // bypass redux-thunk returning a function and typescript complaining about type
    match?: { params?: any };
}

//class UsersAddOrEdit extends React.Component<InjectedFormProps, {}> {
// class UsersAddOrEdit extends React.Component<InjectedFormProps> {
class UsersAddOrEdit extends React.Component<InjectedFormProps & AppProps> {

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            console.log('user selected id = ', this.props.match.params.id);
            this.props.fetchUserDetail(this.props.match.params.id);
        }
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

    render() {
        //const UsersAddOrEdit = () => {
        return (
            <form>
                <Field
                    label="Name"
                    name="name"
                    component={this.renderField}
                />
            </form>
        );
    }
}



const mapStateToProps = (state: StoreState): { userData: UsersStateInterface } => {
    console.log('DDDDD ',state)
    return { userData: state.userData };
};

export default reduxForm({
    form: 'PostsNewForm'
  })(connect(mapStateToProps, { fetchUserDetail })(UsersAddOrEdit));
  
