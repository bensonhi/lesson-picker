import React, { useState } from 'react';
import styles from "./index.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong,faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

function search(item, term) {
  for (let i = 0; i < item.length; i++) {
    if (item[i].text.includes(term)) return true;
  }
  return false;
}

    function rowContent(item,chosen,choose,unchoose,disableChoose) {
      let initial;
      if (chosen.includes(item)) {
        initial = [
          <td key={"choose"}>
            <button
              onClick={() => {
                unchoose(item);
              }}
            >
              去掉這個
            </button>
          </td>,
        ];
      }
       else if (disableChoose==true){
                    initial = [
                      <td key={"uselesschoose"}>
                        <button
                        >
                          衝堂
                        </button>
                      </td>,
                    ];
       }else {
        initial = [
          <td key={"unchoose"}>
            <button
              onClick={() => {
                choose(item);
              }}
            >
              選這個
            </button>
          </td>,
        ];
      }
      return Object.entries(item).reduce((acc, text, index) => {
        let array = [...acc];
        if (
          !Array.isArray(text[1]) &&
          index != 0 &&
          typeof text[1] !== "object"
        )
          array.push(<td key={text[0]}>{text[1]}</td>);
        else if (Array.isArray(text[1]) && index !== 26)
          array.push(<td key={text[0]}>{fieldContent(text[1])}</td>);
        return array;
      }, initial);
    }

    function fieldContent(spans) {
      return spans.map((item, index) => {
        return (
          <a
            key={"https://aps.ntut.edu.tw/course/tw/" + item.href}
            href={"https://aps.ntut.edu.tw/course/tw/" + item.href}
            target="_blank"
          >
            {item.text}
          </a>
        );
      });
    }


function LessonTable ({require,data,unchoose,choose,chosen}) {
  const [numPerPage, setNumPerPage] = useState(25);
    const [pageNum, setPageNum] = useState(1);
    const [filterCollision, setFilterCollision] = useState(true);
    const [length, setLength] = useState(1);
        const [searchTerm, setSearchTerm] = useState("");
        const [typingTimeout, setTypingTimeout] = useState(0);
    let count=0;
    let resultCount=0;
    let content=data.reduce((acc,item, index) => {
      if (item["課"].length == 0) {
        return acc;
      }
      let disableChoose=false;

          for (let i in item["課"]) {
            if (require[item["課"][i]] != 0) {
                    if(filterCollision){
                    return acc;
                    }
                    else disableChoose=true;
                    }
            }
      if (searchTerm !== "") {
        let searchTermArray=searchTerm.split ('&&');
        for(let i=0;i<searchTermArray.length;i++){
        if (
          !item["課號"].includes(searchTermArray[i]) &&
          !item["修"].includes(searchTermArray[i]) &&
          !search(item["課程名稱"], searchTermArray[i]) &&
          !search(item["班級"], searchTermArray[i]) &&
          !search(item["教師"], searchTermArray[i])
        )
          return acc;
          }
      }
      resultCount++;
      if (resultCount > numPerPage * pageNum) return acc;
      if (resultCount < numPerPage * (pageNum - 1)) return acc;
      return [...acc,<tr key={item["_id"]}>{rowContent(item,chosen,choose,unchoose,disableChoose)}</tr>];
    },[])
    if(length!=resultCount)setLength(resultCount);
    if(content.length==0& pageNum!=1) setPageNum(1);

   function  assertSetPageNum(num) {
    let maxNum = length / numPerPage;
    if (num >= 1 && num < maxNum + 1) setPageNum(num);
  }

  function setSearchTermTimer(term) {//todo
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(function () {
        setSearchTerm(term );
        setPageNum(1);
                setSearchTerm(term );
      }, 1),
    );
  };

    let tablehead = [];
    if (typeof data[0] === "object") {
      tablehead = Object.entries(data[0]).reduce(
        (acc, text, index) => {
          if (index !== 0&&index !== 26) return [...acc, <th key={text[0]}>{text[0]}</th>];
          return acc;
        },
        [<th key={"blank"}></th>]
      );
    }

    return (
      <div>
        <h2>可選課程 {length}</h2>
        <h4>
          每頁顯示 {numPerPage} 筆 <br /> 目前頁數:{" "}
          {pageNum}
        </h4>
        <span>過濾衝堂課程 </span>
        <input
          type="checkbox"
          onChange={(e) => {setFilterCollision(!filterCollision)}}
          style={{display:'block'}}
          checked={filterCollision}
        ></input>
        <span>搜尋 </span>
        <input
          type="search"
          onChange={(e) => {setSearchTermTimer(e.target.value)}}
          style={{display:'block'}}
        ></input>
        <div style={{display:'flex'}}>

                <div style={{textAlign:'center',display:'flex',justifyContent:'flex-start',width:100+'%'}}>
                                        <h2 style={{width:'130px'}}>每頁顯示:</h2>
        <button className={styles.pageButton} style={{width:75+'px',fontSize:20+'px'}} onClick={() =>  setNumPerPage(25)}>25</button>
        <button className={styles.pageButton} style={{width:75+'px',fontSize:20+'px'}} onClick={() =>  setNumPerPage(50)}>50</button>
                </div>
        <div style={{textAlign:'center',display:'flex',justifyContent:'flex-end',width:1000+'px',height:80+'px'}}>

        <button className={styles.pageButton}  onClick={() => assertSetPageNum(pageNum - 1)}>
          <FontAwesomeIcon className={styles.pageButtonIcon} icon={faArrowLeftLong} /> <span className={styles.pageButtonText}>previous page</span>
        </button>
                <h2 style={{marginLeft:'10px',width:175+'px'}}>目前頁數: {pageNum} </h2>
        <button   className={styles.pageButton} onClick={() => assertSetPageNum(pageNum + 1)}>
                   <span className={styles.pageButtonText}>next page</span>  <FontAwesomeIcon className={styles.pageButtonIcon} icon={faArrowRightLong} />
        </button>
        </div>
        </div>
        <table style={{ minWidth: 960 + "px" }} className="lessonTable">
          <tbody>
            <tr key={"heading"}>{tablehead}</tr>
            {content}
          </tbody>
        </table>
        <h2>目前頁數: {pageNum} </h2>
        <div style={{textAlign:'center'}}>
        <button className={styles.pageButton}  onClick={() => assertSetPageNum(pageNum - 1)}>
          <FontAwesomeIcon className={styles.pageButtonIcon} icon={faArrowLeftLong} /> <span className={styles.pageButtonText}>previous page</span>
        </button>
        <button  className={styles.pageButton} onClick={() => assertSetPageNum(pageNum + 1)}>
                   <span className={styles.pageButtonText}>next page</span>  <FontAwesomeIcon className={styles.pageButtonIcon} icon={faArrowRightLong} />
        </button>
        </div>
      </div>
    );
  }

export default LessonTable;
