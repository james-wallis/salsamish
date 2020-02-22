import React, { Component } from 'react';
import Link from 'next/link';

class Navbar extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.toggleNavbarFixed);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleNavbarFixed);
  };

  toggleNavbarFixed(event) {
    const navbar = document.getElementById('navbar');
    const beforeElement = document.getElementById('hero');
    const afterElement = document.getElementById('content');
    const { bottom: heroBottom } = beforeElement.getBoundingClientRect();
    if (heroBottom <= 0) {
      if (!navbar.classList.contains('fixed')) {
        navbar.classList.add('fixed');
        afterElement.style.paddingTop = `${navbar.offsetHeight}px`;
      }
    } else {
      navbar.classList.remove('fixed');
      afterElement.style.paddingTop = '';
    }
  };

  render() {
    return <nav id='navbar'>
      {/* <div> */}
        <img src='/salsamish.png' />
      {/* </div> */}
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>Calendar</a>
        </Link>
        <Link href="/">
          <a>Getting here</a>
        </Link>
        {/* <Link href="/">
          <a>Parking</a>
        </Link> */}
        <Link href="/team/djs">
          <a>DJs</a>
        </Link>
        <Link href="/">
          <a>Teachers</a>
        </Link>
        <Link href="/">
          <a>About</a>
        </Link>
        <Link href="/">
          <a>FAQs</a>
        </Link>
      </div>
      <style jsx>{`
      nav {
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
      }
      img {
        position: absolute;
        left: 2%;
        height: 5vh;
        opacity: 0;
        transition: opacity 0.6s ease;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        transition: transform 0.5s ease;
        z-index: 8;
      }
      a {
        margin: 0 2%;
        text-decoration: none;
        color: white;
        font-size: 20px;
        text-transform: uppercase;
      }
      a:hover {
        cursor: pointer;
        color: white;
      }
      .fixed {
        position: fixed;
        top: 0;
      }
      .fixed img {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
      .fixed div {
        transform: translate(10%, 0);
      }
    `}</style>
    </nav>
  }
}
  
export default Navbar;