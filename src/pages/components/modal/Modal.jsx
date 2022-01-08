import { useRef } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import './modal.scss';

const Modal = ({ activeData, closeModal, showModal }) => {
  const modalRef = useRef(null);
  const modalData = activeData[0];

  useOutsideClick(modalRef, closeModal);

  return (
    <div className="modal_layer show">
      <div className="overlay_layer">
        <div ref={modalRef} className="cont_layer" tabIndex="-1" role="dialog" aria-modal="true">
          {modalData !== undefined && 
            <>
            <strong className="title_layer">{modalData.musicalClassName}</strong>
            <div className="inner_layer">
              <div className="layer_thumb">
                <span className="thumb_img" style={{backgroundImage:"url("+modalData.musicalImage+")"}}></span>
              </div>
                <ul className="list_info">
                  <li><em>제작사</em>{modalData.produceCompany}</li>
                  <li><em>작사</em>{modalData.lyricist}</li>
                  <li><em>작곡</em>{modalData.composer}</li>
                  <li><em>공연장</em>{modalData.musicalConcertHall}</li>
                </ul>
                {modalData.characterList.length !== 0 ?
                  <dl className="list_detail">
                    <dt>캐릭터 정보</dt>
                    {modalData.characterList.map((character, index) => (
                      <dd key={index}>{character}</dd>
                      ))
                    }
                  </dl>
                  : null
                }
                {modalData.castList.length !== 0 ?
                  <dl className="list_detail">
                    <dt>등장인물 정보</dt>
                    {modalData.castList.map((cast, index) => (
                      <dd key={index}>{cast}</dd>
                      ))
                    }
                  </dl>
                  : null
                }
            </div>
            </>
          }
          <button type="button" className="btn_close" onClick={closeModal}><span className="ico_close">닫기</span></button>
        </div>
      </div>
    </div>
  )
}

export default Modal;