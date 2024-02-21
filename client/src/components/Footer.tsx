import React from 'react'

const Footer = () => {
  return (
    <footer className="footer p-10 justify-center lg:justify-normal bg-secondary text-white mx-auto mt-8 mb-4 rounded-lg shadow-md shadow-secondary
    xl:max-w-7xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg max-w-sm
    ">
    <nav>
        <h6 className="footer-title">Services</h6> 
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
    </nav> 
    <nav>
        <h6 className="footer-title">Company</h6> 
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
    </nav> 
    <nav>
        <h6 className="footer-title">Legal</h6> 
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
    </nav>
    </footer>
    )
}

export default Footer