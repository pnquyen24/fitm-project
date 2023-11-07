import React, { useState} from 'react';
import "./AboutUs.css";
import Pages from './AboutUsPages/Pages';

const AboutUs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    <Pages Name={"Cáp Thành Đạt"} Avatar={`url("/img/Dat(tachnen).png")` } fbLink={"https://www.facebook.com/profile.php?id=100009472942133"} />,
    <Pages Name={"Nguyễn Trung Dũng"} Avatar={`url("/img/Dung.jpg")`} fbLink={"https://www.facebook.com/nguyendungglk3"} />,
    <Pages Name={"Phạm Ngọc Quyền"} Avatar={`url("/img/Quyen.jpg")`} fbLink={"https://www.facebook.com/PnQ204"}/>,
    <Pages Name={"Trương Thế Cảnh"}Avatar={`url("/img/Canh.jpg")`} fbLink={"https://www.facebook.com/zcanhtruongthez"}/>,
    <Pages Name={"Bùi Ngọc Bảo Trân"} Avatar={`url("/img/Tran.jpg")`} fbLink={'https://www.facebook.com/2bngbtran04'}/>,
    <Pages Name={"Ngô Dương"} Avatar={`url("/img/Duong.png")`} fbLink={"https://www.facebook.com/ryan.0710"}/>,
  ];

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="about-container">
      <div className="about-navigation">
        <button style={{marginLeft:"12vh", backgroundImage:`url("/img/Dat.jpg")`}}  onClick={() => goToPage(1)}></button>       
        <button style={{marginLeft:"9vh", backgroundImage:`url("/img/Dung.jpg")`}} onClick={() => goToPage(2)}></button>
        <button style={{backgroundImage:`url("/img/Quyen.jpg")`}} onClick={() => goToPage(3)}></button>
        <button style={{backgroundImage:`url("/img/Canh.jpg")`}} onClick={() => goToPage(4)}></button>
        <button style={{marginLeft:"9vh", backgroundImage:`url("/img/Tran.jpg")`}} onClick={() => goToPage(5)}></button>
        <button style={{marginLeft:"12vh", backgroundImage:`url("/img/Duong.png")`}} onClick={() => goToPage(6)}></button>
      </div>
      <div className="about-content">{pages[currentPage - 1]}</div>
    </div>
  );
};

export default AboutUs;