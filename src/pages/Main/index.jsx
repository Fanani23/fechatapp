import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import assets from "../../assets";
import "swiper/css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { data } from "autoprefixer";

const Main = () => {
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  const [message, setMessage] = useState();
  const [login, setLogin] = useState({});
  const [list, setList] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState({});
  const [activeChat, setActiveChat] = useState(1);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const self = user.data;
  const token = user.token;
  const friend = JSON.parse(localStorage.getItem("receiver"));

  const [profile, setProfile] = useState([]);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = user.data;
    setLogin(user);
    axios
      .get(`http://localhost:3003/users/all`)
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const socket = io(`http://localhost:3003`);
    socket.on("send-message-response", (response) => {
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
      }
    });
    setSocketIo(socket);
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        let res = await axios.get(`http://localhost:3003/users/profile`, auth);
        setProfile(res.data.data);
        console.log("fetch profile", res.data.data);
      } catch (err) {
        console.log("err fetch profile", err);
      }
    };
    getProfile();
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));
    const payload = {
      sender: user.data.username,
      receiver: receiver.username,
      message,
    };
    setListchat([...listchat, payload]);
    const data = {
      sender: user.data.id,
      receiver: activeReceiver.id,
      message,
    };
    socketio.emit("send-message", data);
    setMessage("");
  };

  const handleReceiver = (item) => {
    setListchat([]);
    setActiveReceiver(item);
    setActiveChat(2);
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login.data);
    const data = {
      sender: login.data.id,
      receiver: item.id,
    };
    socketio.emit("chat-history", data);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className={style.containerMain}>
      <div className={style.mainBase}>
        <div className={style.mainLeft}>
          <div className={style.leftBase}>
            <div className={style.leftMain}>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <p className={style.chatText}>Chatapps</p>
                </div>
                <div type="button" className="mt-1">
                  <img src={assets.logoHamburger} alt="" />
                </div>
              </div>
              <div className={style.profileBase}>
                <img
                  className={style.profileImg}
                  src={profile.photo ? profile.photo : assets.logoProfile}
                  alt=""
                />
                <p className={style.profileName}>
                  {profile.username ? profile.username : "Username"}
                </p>
                <p className={style.profileBio}>
                  {profile.bio ? profile.bio : "Hi there!"}
                </p>
              </div>
              <div className={style.searchBase}>
                <div className={style.searchMain}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                    className="form-control"
                  />
                </div>
                <div type="button">
                  <img className={style.plusImg} src={assets.logoPlus} alt="" />
                </div>
              </div>
              <div className={style.navBase}>
                <div>
                  <button type="button" className={style.buttonAll}>
                    All
                  </button>
                </div>
                <div>
                  <button type="button" className={style.buttonImportant}>
                    Important
                  </button>
                </div>
                <div>
                  <button className={style.buttonUnread}>Unread</button>
                </div>
              </div>
              <div className={style.userScroll}>
                {list.map((user) => {
                  return (
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={0}
                      className={style.userBase}
                    >
                      <SwiperSlide>
                        <div
                          className={style.userMain}
                          onClick={() => handleReceiver(user)}
                          key={user.id}
                        >
                          <div className="d-flex flex-row gap-3">
                            <div className="pt-1">
                              <img
                                className={style.userImg}
                                src={
                                  user.photo ? user.photo : assets.logoProfile
                                }
                                alt=""
                              />
                            </div>
                            <div className="pt-3">
                              <div className={style.userNammeBase}>
                                <p className={style.userName}>
                                  {user.username ? user.username : "Username"}
                                </p>
                                <p className={style.userMessage}>Message</p>
                              </div>
                            </div>
                          </div>
                          <div className={style.userTimeBase}>
                            <div className="pt-0">
                              <p className={style.userTime}>00:00</p>
                            </div>
                            <div className="d-flex flex-block justify-content-end">
                              <img src={assets.logoTotal} alt="" />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className={style.sliderUser}>
                          <div className={style.sliderBase}>
                            <div className={style.sliderMain}>
                              <div type="button" className="">
                                <img src={assets.logoBookmark} alt="" />
                              </div>
                              <div type="button" className="">
                                <img src={assets.logoRead} alt="" />
                              </div>
                              <div type="button" className="">
                                <img src={assets.logoTrash} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={style.mainRight}>
          <div className={style.rightTop}>
            <div className="pt-4">
              <div className={style.rightHeader}>
                <div className="mt-3">
                  <div className={style.headerMain}>
                    <div>
                      <p className={style.headerText}>
                        {activeReceiver.username
                          ? activeReceiver.username
                          : "Please select a chat to start messaging"}
                      </p>
                    </div>
                    <div type="button" onClick={handleLogout}>
                      <img src={assets.logoMenu} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.rightCenter}>
            {listchat.map((item) => (
              <div key={item.id} className="pt-4">
                {item.sender === login.data.username ? (
                  <div className={style.rightChat}>
                    <div className={style.chatMain}>
                      <div className={style.chatRight}>
                        <p className={style.rightSender}>You</p>
                        <p className={style.rightMessage}>{item.message}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={style.rightChat}>
                    <div className={style.chatMain}>
                      <div className={style.chatRight}>
                        <p className={style.rightReceiver}>{item.username}</p>
                        <p className={style.leftMessage}>{item.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={style.rightBottom}>
            <div className="pt-4">
              <div className={style.rightFooter}>
                <div className="mt-3">
                  <div className={style.footerMain}>
                    <form className={style.inputBase} onSubmit={handleMessage}>
                      <input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Type your message..."
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </form>
                    <div type="submit" className="pt-1">
                      <img src={assets.logoPlus} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
