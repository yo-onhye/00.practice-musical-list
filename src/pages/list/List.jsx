import { useState, useEffect } from "react";
import Modal from "../components/modal/Modal";
import axios from 'axios';
import './list.scss';

const List = () => {
  const [musical, setMusical] = useState([]);
  const [musicalList, setMusicalList] = useState([]);
  const [modalList, setModalList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const activeData = modalList.filter((item) =>
    item.musicalClassId === activeIndex
  );

  const fetchMusicals = async () => {
     const response = await axios.get(
       'https://yo-onhye.github.io/00.practice-musical-list/db.json'
     );
     setMusical(response.data);
     setMusicalList(response.data.musicalClasses);
     setModalList(response.data.musicalClass);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  console.log(showModal)

  useEffect(() => {
    fetchMusicals();
  }, []);

  return (
    <>
    <div className="cont_musical">
      {musicalList.length !== 0 ?
        <ul className="list_musical">
          {musicalList.map(item => (
          <li key={item.musicalClassId} className="item_musical">
            <button type="button" className="btn_musical" onClick={()=> { setShowModal(true);setActiveIndex(item.musicalClassId) }}>
              <div className="musical_thumb">
                <span className="thumb_img" style={{backgroundImage:"url("+item.image+")"}}></span>
              </div>
  
              <div className="musical_info">
                <div className="musical_title">
                  <strong className="txt_title">{item.musicalClassName}</strong>
                  <div className="box_tag">
                    {item.musicalTag.length !== 0 ?
                      item.musicalTag.map((tag, index) => (
                      <span key={index} className="tag_g">{tag}</span>
                      ))
                      : null
                    }
                  </div>
                </div>
                <div className="musical_price">
                  <em className="num_price">{item.price}원</em>
                </div>
                <div className="musical_desc">
                  <span className="txt_g">{item.period}</span>
                  <span className="txt_g">{item.runningTime}분</span>
                  <span className="txt_g txt_place">{item.musicalConcertHall}</span>
                </div>
              </div>
            </button>
          </li>
          ))}
        </ul>
        : <div className="area_error">데이터를 불러올 수 없습니다.</div>
      }
    </div>
    {showModal &&
      <Modal activeData={activeData} closeModal={closeModal} />
    }
    </>
  )
}

export default List;