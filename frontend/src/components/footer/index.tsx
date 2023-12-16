import React from 'react'
import { Link } from "react-router-dom"; //npm install react-icons --save
import { BsFacebook } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import './footer.css';
export default function Footer() {
  return (
    <div className="footer-member">
      <div className="content s6 left">
        <span>BANNA</span>
        <div className="img-logo"></div>
      </div>
      <div className="content s6 mid">
        <span>CONTACT</span>
        <div className="text-s6">
          <p>
            111/3, Surawithee 1, Suranaree
            <br />
            Mueang Nakhon Ratchasiima,
            <br />
            Nakho Ratchasiima, 30000
          </p>
          <p>
            <strong>EMAIL</strong> : SE_T08@sut.ac.th
          </p>
          <p>
            <strong>TEL.</strong> :0433333333
          </p>
          <div className="icon-s6">
            <a href="https://github.com/BHU23">
              <BsFacebook className="icon" />
            </a>
            <a href="https://github.com/BHU23">
              <RiTwitterXLine className="icon" />
            </a>
            <a href="https://github.com/BHU23">
              <LuInstagram className="icon" />
            </a>
            <a href="https://github.com/BHU23">
              <FaGithub className="icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="content s6 right">
        <span>LOCATION</span>
        <div className="text-s6">
          <Link
            to={
              "https://www.google.co.th/maps/place/%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B9%80%E0%B8%97%E0%B8%84%E0%B9%82%E0%B8%99%E0%B9%82%E0%B8%A5%E0%B8%A2%E0%B8%B5%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%99%E0%B8%B2%E0%B8%A3%E0%B8%B5/@14.8817767,102.0181213,17z/data=!3m1!4b1!4m6!3m5!1s0x311eada1f2cc53f1:0x10533e4b3f07a09f!8m2!3d14.8817715!4d102.0206962!16zL20vMDUyMGRw?hl=th&entry=ttu"
            }
          >
            <div className="img-map"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
