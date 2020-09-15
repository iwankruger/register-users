import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormProps } from 'redux-form';


//class UsersAddOrEdit extends React.Component<InjectedFormProps, {}> {
// class UsersAddOrEdit extends React.Component<InjectedFormProps> {
class UsersAddOrEdit extends React.Component<InjectedFormProps> {

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

const mapStateToProps = () => {
    return { };
  };

export default reduxForm({
    form: 'PostsNewForm'
  })(connect(null)(UsersAddOrEdit));
  
