import React from "react";
import "./home.scss";

const Card = () => {
  const cardsData = [
    {
      id: 1,
      title: "Lottery Scam",
      message: "You've won $10,000! Click here to claim your prize now!",
      link: "#",
      left: "0px",
      top: "100px",
      delay: "0ms",
      duration: "0ms",
      colorClass: "text-red-700",
    },
    {
      id: 2,
      title: "Fake News",
      message: "Celebrity XYZ just announced their move to another planet!",
      link: "#",
      left: "230px",
      delay: "1345ms",
      
      duration: "760ms",
      colorClass: "text-yellow-700",
    },
    {
      id: 3,
      title: "Terror Post",
      message:
        "This group claims responsibility for the recent internet outage.",
      link: "#",
      left: "460px",
      top: "114px",
      delay: "2690ms",
      duration: "1520ms",
      colorClass: "text-green-700",
    },
    {
      id: 4,
      title: "Social Media Scam",
      message: "This influencer's diet will make you lose 20 pounds in 2 days!",
      link: "#",
      left: "690px",
      delay: "4035ms",
      duration: "2280ms",
      colorClass: "text-blue-700",
    },
    {
      id: 5,
      title: "Viral Fake Giveaway",
      message:
        "Win a brand new car by sharing this post! Click to participate!",
      link: "#",
      left: "920px",
      top: "128px",
      delay: "5380ms",
      duration: "3040ms",
      colorClass: "text-purple-700",
    },
    {
      id: 6,
      title: "Phishing Alert",
      message: "Your account has been compromised. Click here to secure it!",
      link: "#",
      left: "1150px",
      delay: "6725ms",
      duration: "3800ms",
      colorClass: "text-pink-700",
    },
    {
      id: 7,
      title: "Misinformation",
      message: "Breaking: New study shows that the earth might be flat!",
      link: "#",
      left: "1380px",
      top: "142px",
      delay: "8070ms",
      duration: "4560ms",
      colorClass: "text-orange-700",
    },
    {
      id: 8,
      title: "Identity Theft Scam",
      message: "We need your details to confirm your identity. Click here.",
      link: "#",
      left: "1610px",
      delay: "9415ms",
      duration: "5320ms",
      colorClass: "text-indigo-700",
    },
    {
      id: 9,
      title: "Investment Fraud",
      message: "Double your investment in one week with this opportunity!",
      link: "#",
      left: "1840px",
      top: "156px",
      delay: "10760ms",
      duration: "6080ms",
      colorClass: "text-teal-700",
    },
    {
      id: 10,
      title: "Malware Alert",
      message: "Install this app for free phone security checks!",
      link: "#",
      left: "2070px",
      delay: "12105ms",
      duration: "6840ms",
      colorClass: "text-gray-700",
    },
    {
      id: 11,
      title: "Romance Scam",
      message: "Find your soulmate by clicking this exclusive link!",
      link: "#",
      left: "2300px",
      top: "170px",
      delay: "13450ms",
      duration: "7600ms",
      colorClass: "text-red-600",
    },
    {
      id: 12,
      title: "Counterfeit Product Ad",
      message: "Buy genuine luxury watches at an 80% discount here!",
      link: "#",
      left: "2530px",
      delay: "14795ms",
      duration: "8360ms",
      colorClass: "text-lime-700",
    },
    {
      id: 13,
      title: "Pyramid Scheme",
      message: "Join our program and make money by recruiting others!",
      link: "#",
      left: "2760px",
      top: "184px",
      delay: "16140ms",
      duration: "9120ms",
      colorClass: "text-cyan-700",
    },
    {
      id: 14,
      title: "Clickbait Headline",
      message: "You won't believe what this celebrity did last summer!",
      link: "#",
      left: "2990px",
      delay: "17485ms",
      duration: "9880ms",
      colorClass: "text-green-600",
    },
  ];
  return (
    <div className="card-scroll-container">
      {cardsData.map((card) => (
        <div
          key={card.id}
          className={`card ${card.colorClass}`}
          style={{
            left: card.left,
            top: card.top,
            animationDelay: card.delay,
            animationDuration: card.duration,
          }}
        >
          {/* Card Content */}
          <div className="card-title">{card.title}</div>
          <div className="card-message">{card.message}</div>
          <a href={card.link} className="card-link">
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};

export default Card;
