import "./LP.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const jump = (e) => {
    e.scrollIntoView({ behavior: "smooth" });
};
function LandingPage() {
    const VIEW_PERFORMANCE_URL = "PerformanceSchedule/ViewPerformance";

    let [performances, setPerformances] = useState([
        {
            id: 6,
            name: "Army Night",
            place: "Quân Đoàn 5",
            date: "2023-11-10",
            time: "20:00:00",
        },
        {
            id: 6,
            name: "Army Night",
            place: "Quân Đoàn 5",
            date: "2023-11-10",
            time: "20:00:00",
        },
        {
            id: 6,
            name: "Army Night",
            place: "Quân Đoàn 5",
            date: "2023-11-10",
            time: "20:00:00",
        },
    ]);
    const [scrolled, setScrolled] = useState(false);
    const [position, setPosition] = useState(1);
    const navigate = useNavigate();
    let [topShow, setTopShow] = useState(2);

    const topshowData = [
        {
            position: "Quoc Hoc Quy Nhon",
            eventName: "Drive chickens 2021",
            imgLink: "static/media/s1.3187e068cff7f9560855.jpg",
        },
        {
            position: "FPTU Quy Nhon",
            eventName: "Open Day 2021",
            imgLink: "static/media/s2.ce8da35094699949d646.jpg",
        },
        {
            position: "NASA",
            eventName: "Cook Day 2021",
            imgLink: "static/media/s3.3070acd7fbae7682402a.jpg",
        },
    ];

    function handldeLogin() {
        navigate("/login");
    }

    useEffect(() => {
        axios
            .get(VIEW_PERFORMANCE_URL)
            .then((response) => {
                setPerformances(response.data);
            })
            .catch((error) => {});
    }, []);

    useEffect(() => {
        document.title = "FIT";

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= 9) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            const showsPosition = document.querySelector(".shows").offsetTop;
            const introducePosition =
                document.querySelector(".introduce").offsetTop;
            const contactPosition =
                document.querySelector(".contact").offsetTop;

            if (scrollY < showsPosition) {
                setPosition(1);
            } else if (
                scrollY >= showsPosition &&
                scrollY < introducePosition
            ) {
                setPosition(2);
            } else if (
                scrollY >= introducePosition &&
                scrollY < contactPosition
            ) {
                setPosition(3);
            } else if (scrollY >= contactPosition) {
                setPosition(4);
            }
        };

        let interval = setInterval(() => {
            setTopShow((prevTopShow) => (prevTopShow + 1) % topshowData.length);
        }, 3000);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="landingPage">
            {scrolled === true ? (
                <div className="fix-header-cover">
                    <div className="fix-header">
                        <div className="left-header">
                            <div className="choices">
                                <ul>
                                    <li>
                                        <button
                                            id="home"
                                            class={
                                                "choice" +
                                                (position === 1
                                                    ? " hd-active"
                                                    : "")
                                            }
                                            onClick={() => {
                                                jump(
                                                    document.querySelector(
                                                        ".startPage"
                                                    )
                                                );
                                            }}
                                        >
                                            HOME
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            id="shows"
                                            class={
                                                "choice" +
                                                (position === 2
                                                    ? " hd-active"
                                                    : "")
                                            }
                                            onClick={() => {
                                                jump(
                                                    document.querySelector(
                                                        ".shows"
                                                    )
                                                );
                                            }}
                                        >
                                            SHOWS
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            id="about"
                                            class={
                                                "choice" +
                                                (position === 3
                                                    ? " hd-active"
                                                    : "")
                                            }
                                            onClick={() => {
                                                jump(
                                                    document.querySelector(
                                                        ".introduce"
                                                    )
                                                );
                                            }}
                                        >
                                            ABOUT US
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            id="choice"
                                            class={
                                                "choice" +
                                                (position === 4
                                                    ? " hd-active"
                                                    : "")
                                            }
                                            onClick={() => {
                                                jump(
                                                    document.querySelector(
                                                        ".contact"
                                                    )
                                                );
                                            }}
                                        >
                                            CONTACT
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-header">
                            <a href="/login" className="login-btn">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="screen startPage">
                <div className="LP-header">
                    <div className="left-header">
                        <div className="choices">
                            <ul>
                                <li>
                                    <button
                                        id="home"
                                        class={
                                            "choice" +
                                            (position === 1 ? " hd-active" : "")
                                        }
                                        onClick={() => {
                                            jump(
                                                document.querySelector(
                                                    ".startPage"
                                                )
                                            );
                                        }}
                                    >
                                        HOME
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="shows"
                                        class={
                                            "choice" +
                                            (position === 2 ? " hd-active" : "")
                                        }
                                        onClick={() => {
                                            jump(
                                                document.querySelector(".shows")
                                            );
                                        }}
                                    >
                                        SHOWS
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="about"
                                        class={
                                            "choice" +
                                            (position === 3 ? " hd-active" : "")
                                        }
                                        onClick={() => {
                                            jump(
                                                document.querySelector(
                                                    ".introduce"
                                                )
                                            );
                                        }}
                                    >
                                        ABOUT US
                                    </button>
                                </li>
                                <li>
                                    <button
                                        id="choice"
                                        class={
                                            "choice" +
                                            (position === 4 ? " hd-active" : "")
                                        }
                                        onClick={() => {
                                            jump(
                                                document.querySelector(
                                                    ".contact"
                                                )
                                            );
                                        }}
                                    >
                                        CONTACT
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right-header">
                        <a href="/login" className="login-btn">
                            Login
                        </a>
                    </div>
                </div>
                <div className="banner">
                    <div className="cd">
                        <div
                            className="cd-banner"
                            style={{
                                backgroundImage: `url(${topshowData[topShow].imgLink})`,
                            }}
                        >
                            <div className="decor">FITM</div>
                        </div>
                    </div>
                    <div className="top-show">
                        <h2>TRADITIONAL MUSICAL INSTRUMENT</h2>
                        <span>{topshowData[topShow].position}</span>
                        <p> {topshowData[topShow].eventName} </p>
                    </div>
                    <div className="club-info">
                        <div className="logo"></div>
                        <p>
                            The <strong>Diamond</strong> Of All{" "}
                            <strong>Generations</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className="screen shows">
                <div className="left">
                    <h2>OUR COMMING SHOWS</h2>
                    <div className="show-info">
                        <div className="info location">
                            {" "}
                            <strong>Location | </strong> {performances[0].place}
                        </div>
                        <div className="info date">
                            {" "}
                            <strong>Date | </strong> {performances[0].date}
                        </div>
                        <div className="info time">
                            <strong>Time |</strong> {performances[0].time}
                        </div>
                        <div className="info songs">
                            <strong>Songs | </strong>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="show1 show">
                        <div
                            className="picture"
                            style={{
                                backgroundImage: `url("${performances[0].backgroundImg}")`,
                            }}
                        ></div>
                        <div className="description"></div>
                    </div>
                    <div className="show2 show">
                        <div
                            className="picture"
                            style={{
                                backgroundImage: `url("${performances[1].backgroundImg}")`,
                            }}
                        ></div>
                        <div className="description"></div>
                    </div>
                    <div className="show3 show">
                        <div
                            className="picture"
                            style={{
                                backgroundImage: `url("${performances[2].backgroundImg}")`,
                            }}
                        ></div>
                        <div className="description"></div>
                    </div>
                </div>
            </div>
            <div className="screen introduce">
                <div className="intro-left">
                    <h2>FIT</h2>
                    <div className="text-wrap">
                        <span>
                            Để cho vui thôi chứ không biết viết gì vào hết mấy
                            má sau có nội dung gì thì tự sửa điền vào nha, viết
                            cái gì dài dài nhìn cho nó đỡ trống, mô tả này kia
                            nè delectus iste corrupti!
                        </span>
                    </div>
                    <br />
                    <a>FOLLOW US </a>
                </div>
                <div className="intro-right">
                    <div className="cover">
                        <div className="img1 img"></div>
                        <div className="img2 img"></div>
                    </div>
                    <div className="cover">
                        <div className="img3 img"></div>
                        <div className="img4 img"></div>
                    </div>
                </div>
            </div>
            <div className="screen contact">
                <h2>Contact Us</h2>
                <div className="contact-cover">
                    <div className="contact-left">
                        <div className="contact-content">
                            <div className="contact-method">
                                <div className="contact-icon">
                                    <ion-icon name="call-outline"></ion-icon>
                                </div>
                                <div className="contact-info">09876543210</div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon">
                                    <ion-icon name="mail-open-outline"></ion-icon>
                                </div>
                                <div className="contact-info">
                                    Cuutoivoi@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className="contact-social">
                            <a href="#">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-tiktok"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-youtube"></ion-icon>
                            </a>
                            <a href="#">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div className="contact-right">
                        <iframe
                            className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.1213046292164!2d109.21919446585878!3d13.805000051380684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6bf778c80973%3A0x8a7d0b5aa0af29c7!2sFPT%20University%20Quy%20Nhon%20AI%20Campus!5e0!3m2!1sen!2s!4v1698803296484!5m2!1sen!2s"
                            width="100%"
                            height="450"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
}
export default LandingPage;
