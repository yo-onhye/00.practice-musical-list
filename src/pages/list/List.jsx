import { useState, useEffect, useRef } from "react";
import Modal from "../components/modal/Modal";
import apiFetch from '../components/api';
import './list.scss';

const List = () => {
  const numLimit = 2;
  const [numPage, setNumPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [musicalList, setMusicalList] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const loadingRef = useRef(false);
  

  const closeModal = () => {
    setShowModal(false);
  }

  const showMore = () => {
    setNumPage(numPage + 1);
  }

  useEffect(() =>{
    const getData = async () => {
      try {
        loadingRef.current = true;

        const response = await apiFetch({
          url: '/musicalClasses',
          params: {
            '_limit': numLimit,
            '_page': numPage
          }
        })

        const response2 = await apiFetch({
          url: '/musicalClass',
          params: {
            'musicalClassId': activeIndex
          }
        })

        loadingRef.current = false;
        setTotalCnt(response.data.length);

        setMusicalList(state => state.concat(response.data));
        setModalData(response2.data);
      } catch (err) {
        console.log(err)
        setError(true);
      }
    }
    getData();
  }, [numPage,activeIndex])

  if (loadingRef.current) return <div className="cont_loading"><span className="ico_loading"></span><span className="txt_loading">loading</span></div>;
  if (error) return <div className="cont_error"><span className="txt_error">에러가 발생했습니다</span></div>;
  return (
    <>
    <div className="cont_musical">
      {musicalList.length > 0 ?
        <>
        <ul className="list_musical">
          {musicalList.map((item, index) => (
          <li key={`musical_${index}`} className="item_musical">
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
        {totalCnt > 0 && (
          <button type="button" className="btn_more" onClick={showMore}>더보기</button>
         )
        } 
        </>
        : <div className="area_error">데이터를 불러올 수 없습니다.</div>
      }
    </div>
    <Modal activeData={modalData} closeModal={() => closeModal} showModal={showModal} />
    </>
  )
}

export default List;