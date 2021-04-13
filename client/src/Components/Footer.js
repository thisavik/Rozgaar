import React from 'react';
import {SiFacebook} from 'react-icons/si';
import {SiInstagram} from 'react-icons/si';
import {FiMail} from 'react-icons/fi';
import {FiTwitter} from 'react-icons/fi';


const Footer = ()=>{
    return (
     <div className="footer">
         <footer className="bg-dark text-center text-lg-start mt-7.">
            <h2 className=" mt-5 mb-4 text-light" style={{textAlign:'center'}}>About Us</h2>
            <div id="container" className="team">
          <button type="button" className="btn btn-outline-success mr-3"> About Rozgaar</button>
        <a href="team.html"><button type="button" className="btn btn-outline-success  ml-3"> Our Team</button></a>
         <u><h5 className="text-light mt-4" style={{textAlign:"center"}}>Follow Us</h5></u>
         <a href="https://www.facebook.com/"><SiFacebook style={{color : "#1877F2"}} className="mr-4 mb-3 mt-3"/></a>
         <a href="https://www.instagram.com/"><SiInstagram style={{color : "#E1306C"}} className="mr-4 mb-3 mt-3"/></a>
         <a href="https://mail.google.com/"><FiMail style={{color : "#FF0000"}} className="mr-4 mb-3 mt-3"/></a>
         <a href="https://twitter.com/?lang=en"><FiTwitter style={{color : "#1DA1F2"}} className="mr-4 mb-3 mt-3"/></a>
        </div>
        <div className="text-center p-3 text-light" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2021
    <a className="text-light" href="#!"> Rozgaar.com</a>
            </div>
         </footer>
     </div>
    );
};



export default Footer;