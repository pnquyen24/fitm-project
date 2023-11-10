import React, { useState} from 'react';
import "./AboutUs.css";
import Pages from './AboutUsPages/Pages';

const AboutUs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    <Pages Name={"Cáp Thành Đạt"} Avatar={`url("/static/media/Dat-1.4d8ef58ea1b2375c232e.png")` } fbLink={"https://www.facebook.com/profile.php?id=100009472942133"} />,
    <Pages Name={"Nguyễn Trung Dũng"} Avatar={`url("/static/media/Dung-1.6f70c81df457eb8d6797.png")`} fbLink={"https://www.facebook.com/nguyendungglk3"} />,
    <Pages Name={"Phạm Ngọc Quyền"} Avatar={`url("/static/media/Quyen-1.bcc901a0cefb00e05e92.png")`} fbLink={"https://www.facebook.com/PnQ204"}/>,
    <Pages Name={"Trương Thế Cảnh"} Avatar={`url("/static/media/Canh-1.9bc3e98166c5f124611b.png")`} fbLink={"https://www.facebook.com/zcanhtruongthez"}/>,
    <Pages Name={"Bùi Ngọc Bảo Trân"} Avatar={`url("/static/media/Tran-1.ccf4680f88bc2459b5d1.png")`} fbLink={'https://www.facebook.com/2bngbtran04'}/>,
    <Pages Name={"Ngô Dương"} Avatar={`url("/static/media/Duong-2.1c84236ed5fa84923337.png")`} fbLink={"https://www.facebook.com/ryan.0710"}/>,
  ];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="about-container">
      <div className="about-navigation">
        <button style={{marginLeft:"17vh", backgroundImage:`url("/static/media/Dat-1.4d8ef58ea1b2375c232e.png")`}}  onClick={() => goToPage(1)}></button>       
        <button style={{marginLeft:"13vh", backgroundImage:`url("/static/media/Dung-1.6f70c81df457eb8d6797.png")`}} onClick={() => goToPage(2)}></button>
        <button style={{marginLeft:"10vh" , backgroundImage:`url("/static/media/Quyen-1.bcc901a0cefb00e05e92.png")`}} onClick={() => goToPage(3)}></button>
        <button style={{marginLeft:"10vh" , backgroundImage:`url("/static/media/Canh-1.9bc3e98166c5f124611b.png")`}} onClick={() => goToPage(4)}></button>
        <button style={{marginLeft:"13vh", backgroundImage:`url("/static/media/Tran-1.ccf4680f88bc2459b5d1.png")`}} onClick={() => goToPage(5)}></button>
        <button style={{marginLeft:"17vh", backgroundImage:`url("/static/media/Duong-2.1c84236ed5fa84923337.png")`}} onClick={() => goToPage(6)}></button>
      </div>
      <div className="about-content">{pages[currentPage - 1]}</div>
    </div>
  );
};

export default AboutUs;