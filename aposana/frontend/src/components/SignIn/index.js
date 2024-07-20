import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
        };
    }

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    fetchUser = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        let data = { username, password };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(
                'http://localhost:8000/SignIn/',
                options
            );

            // Check if response is not ok
            if (!response.ok) {
                const errorText = await response.text();
                this.setState({ errorMessage: errorText });
                console.log('Error:', errorText);
                return;
            }

            const Reciveddata = await response.json();
            const { jwtToken } = Reciveddata;
            console.log(jwtToken);

            // Check for successful login and store jwtToken
            if (jwtToken) {
                localStorage.setItem('jwtToken', jwtToken);
                this.props.navigate('/Notes/');
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({
                errorMessage: 'An error occurred. Please try again.',
            });
        }
    };

    render() {
        const { errorMessage } = this.state;
        return (
            <div className="containerBox">
                <form className="form-Group" onSubmit={this.fetchUser}>
                    <label htmlFor="userId">Username</label>
                    <input
                        className="SignIninput"
                        id="username"
                        type="text"
                        placeholder="Enter the Username"
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="Password">Password</label>
                    <input
                        className="SignIninput"
                        id="password"
                        type="password"
                        placeholder="Enter the Password"
                        onChange={this.handleInputChange}
                    />
                    <button className="signInBtn" type="submit">
                        Sign In
                    </button>

                    <p>
                        Don't have an account?{' '}
                        <Link to="/SignUp">Create a new account</Link>
                    </p>
                    {errorMessage && (
                        <div className="responseElF">{errorMessage}</div>
                    )}
                </form>
            </div>
        );
    }
}

function SignInWithNavigation(props) {
    const navigate = useNavigate();
    return <SignIn {...props} navigate={navigate} />;
}

export default SignInWithNavigation;
