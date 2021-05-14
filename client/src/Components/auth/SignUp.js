import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from '../Assets/favicon.ico';
import { Form, FormGroup, Label, Input} from 'reactstrap';


import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signup } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    welcomeBack: {
        margin: "20px auto",
        textAlign: "center"
    }
}));

export default function SignUp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignup, setIsSignup] = useState(true);

    const initialState = { name: '', email: '', password: '', confirmPassword: '' };

    const [formData, setFormData] = useState(initialState);

    const handleSubmitSignIn = () => {
        const { setOpen, setOpen1 } = props;
        setOpen1(false);
        setOpen(true);
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
    };

    

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(signup(formData, history));
        props.setOpen1(false);
    };

    return (
        <Container component="main" maxWidth="xs">

            <Typography variant="h4" className={classes.welcomeBack}>
                Welcome To Rozgaar
      </Typography>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img
                        src={logo}
                        alt="logoImg"
                    />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
        </Typography>
                <form className={classes.form} onSubmit={handleSubmitSignUp} noValidate>
                    {isSignup && (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                    )}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleChange}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleChange}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirm password"
                        autoComplete="current-password"
                    />
                   <Form>
                   <FormGroup check>
          <Label check className="mr-5 mt-2">
            <Input type="radio" name="radio1" />
            Job Seeker
          </Label>
        
          <Label check className="mr-5 mt-2">
            <Input type="radio" name="radio1" />
            Employer
          </Label>
        </FormGroup>
                   </Form>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={handleSubmitSignIn}>{"have an account? Sign In"}</Button>
                        </Grid>
                    </Grid>
                    <div>
                        <br />
                    </div>
                </form>
            </div>
        </Container>
    );
}
