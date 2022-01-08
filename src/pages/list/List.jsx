import { useState, useEffect } from "react";
import axios from 'axios';
import './list.scss';

const List = () => {
  const [musical, setMusical] = useState([]);
  const [musicalList, setMusicalList] = useState([]);

  const fetchMusicals = async () => {
     const response = await axios.get(
       'https://yo-onhye.github.io/00.practice-musical-list/db.json'
     );
     setMusical(response.data);
     setMusicalList(response.data.musicalClasses);
  };

  useEffect(() => {
    fetchMusicals();
  }, []);

  console.log(musical)
  return (
    <div className="cont_musical">
      <ul className="list_musical">
        {musicalList.length > 0 && musicalList.map(item => (
          <li key={item.musicalClassId} className="item_musical">
            <div className="musical_thumb">
              <span className="thumb_img" style={{backgroundImage:"url("+item.image+")"}}></span>
            </div>

            <div className="musical_info">
              <div className="musical_title">
                <strong className="txt_title">{item.musicalClassName}</strong>
                <div className="box_tag">
                  {item.musicalTag.map(tag => (
                  <span className="tag_g">{tag}</span>
                  ))}
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List;