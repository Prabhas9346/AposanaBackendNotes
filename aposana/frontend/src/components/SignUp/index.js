import { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            response: '',
            success: false,
        };
    }

    validateUsername = (event) => {
        const username = event.target.value.trim();
        if (!username) {
            this.setState({ usernameError: 'Username should not be empty' });
        } else {
            this.setState({ usernameError: '' });
        }
    };

    validateEmail = (event) => {
        const email = event.target.value.trim();
        // Add any email validation if needed
        if (!email) {
            this.setState({ emailError: 'Email should not be empty' });
        } else {
            this.setState({ emailError: '' });
        }
    };

    validatePassword = (event) => {
        const password = event.target.value.trim();
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!passwordRegex.test(password)) {
            this.setState({
                passwordError: `Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character`,
            });
        } else {
            this.setState({ passwordError: '' });
        }
    };

    handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value.trim();
        this.setState({ confirmPassword });

        if (confirmPassword !== this.state.password) {
            this.setState({ confirmPasswordError: 'Passwords do not match' });
        } else {
            this.setState({ confirmPasswordError: '' });
        }
    };

    handleInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    fetchUser = async (event) => {
        event.preventDefault();
        const { username, email, password, confirmPassword } = this.state;

        if (!username || !email || !password || password !== confirmPassword) {
            alert('Please correct the errors before submitting');
            return;
        }

        let data = { username, email, password };

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
                'http://localhost:8000/SignUp/',
                options
            );

            if (!response.ok) {
                const errorText = await response.text();
                this.setState({ response: errorText, success: false });
                console.log('Error:', errorText);
                return;
            }

            const datavalue = await response.text();
            this.setState({ response: datavalue, success: true });
            console.log(datavalue);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    render() {
        const { response, success } = this.state;
        return (
            <div className="containerBox">
                {!success ? (
                    <form className="form-Group">
                        <label htmlFor="userId">Username</label>
                        <input
                            className="SignIninput"
                            id="username"
                            type="text"
                            placeholder="Enter the Username"
                            onBlur={this.validateUsername}
                            onChange={this.handleInputChange}
                        />
                        {this.state.usernameError && (
                            <div className="error">
                                {this.state.usernameError}
                            </div>
                        )}

                        <label htmlFor="email">Email</label>
                        <input
                            className="SignIninput"
                            id="email"
                            type="text"
                            placeholder="Enter the Email"
                            onBlur={this.validateEmail}
                            onChange={this.handleInputChange}
                        />
                        {this.state.emailError && (
                            <div className="error">{this.state.emailError}</div>
                        )}

                        <label htmlFor="Password">Password</label>
                        <input
                            className="SignIninput"
                            id="password"
                            type="password"
                            placeholder="Enter the Password"
                            onBlur={this.validatePassword}
                            onChange={(event) => {
                                this.handleInputChange(event);
                                this.validatePassword(event);
                            }}
                        />
                        {this.state.passwordError && (
                            <div>
                                <p className="error">
                                    {this.state.passwordError}
                                </p>
                            </div>
                        )}

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="SignIninput"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={this.handleConfirmPasswordChange}
                        />
                        {this.state.confirmPasswordError && (
                            <div className="error">
                                {this.state.confirmPasswordError}
                            </div>
                        )}

                        <button
                            className="signInBtn"
                            onClick={this.fetchUser}
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <p>
                            Already have an account, <Link to="/">Sign In</Link>
                        </p>
                        <p className={success ? 'responseEl' : 'responseElF'}>
                            {response}
                        </p>
                    </form>
                ) : (
                    <p className="responseEl">
                        {response}
                        <Link to="/"> Click Here to Sign IN</Link>
                    </p>
                )}
            </div>
        );
    }
}

export default SignUp;
