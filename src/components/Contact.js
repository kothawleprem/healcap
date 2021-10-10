import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Contact() {


  const classes = useStyles();
  const history = useHistory();

    const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""});
    
    const userContact = async () => {

        try{
            const res = await fetch('/getdata', {
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                     
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            setUserData( {...userData, name:data.name, email:data.email, phone:data.phone });

            if(!res.sataus === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
         console.log(err);
         history.push('/login');
        }
    }

        useEffect(() => {
          userContact();
           // eslint-disable-next-line react-hooks/exhaustive-deps
         },[]);
    

   // storing data in  state 

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]:value });
  }

  // send data to  backend 
  const contactForm = async(e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method:"POST",
      headers: {
          "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name , email , phone , message
      })
    });
    const data = await res.json();

    if (!data) {
      console.log("message not send");
} else {
  alert ("Message Send");
  setUserData({ ...userData, message: "" });

}
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
         <MailIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Contact us
        </Typography>
        <form method="POST" className={classes.form} noValidate  variant="outlined">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            value={userData.name}
            onChange={handleInputs}
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="email"
            value={userData.email}
            onChange={handleInputs}
            type="email"
            id="email"
            autoComplete="email"
          />

         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="phone"
            value={userData.phone}
            onChange={handleInputs}
            type="phone"
            id="phone"
            autoComplete="phone"
          />
           <Grid >
           <TextField
          id="outlined-multiline-static"
          label="Message"
          value={userData.message}
          onChange={handleInputs}
          fullWidth
          name="message"
          multiline
          rows={4}
         variant="outlined"
         margin="normal"
        />
          </Grid>


      

        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={contactForm}
            className={classes.submit}
          >
            Contact us
          </Button>
        
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}