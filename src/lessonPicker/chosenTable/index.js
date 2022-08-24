import React from "react";
import Cookies from "universal-cookie";
import styles from "./index.module.css";

const cookies = new Cookies();

class LessonTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const unchoose = this.props.unchoose;
    const choose = this.props.choose;
    const chosen = this.props.chosen;
    let shownColumn = [0, 1, 2, 5, 6, 7, 8, 16, 21];
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
    function rowContent(item) {
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
      } else {
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
        if (shownColumn.includes(index)) {
          if (
            !Array.isArray(text[1]) &&
            index != 0 &&
            typeof text[1] !== "object"
          )
            array.push(<td key={text[0]}>{text[1]}</td>);
          else if (Array.isArray(text[1]) && index !== 26)
            array.push(<td key={text[0]}>{fieldContent(text[1])}</td>);
        }
        return array;
      }, initial);
    }
    let content = chosen.map((item, index) => {
      return <tr key={item["_id"]}>{rowContent(item)}</tr>;
    });
    let tablehead = [];
    if (typeof chosen[0] === "object") {
      tablehead = Object.entries(chosen[0]).reduce(
        (acc, text, index) => {
          if (index !== 0 && shownColumn.includes(index))
            return [...acc, <th key={text[0]}>{text[0]}</th>];
          return acc;
        },
        [<th key={"blank"}></th>]
      );
    }
    const formattedChosen = chosen.reduce((previous, now) => {
      previous.push(now["課號"]);
      return previous;
    }, []);
    cookies.set("Chosen", formattedChosen, { path: "/", expires: new Date(2025, 11, 17) });
    const blob = new Blob(formattedChosen);
    const fileDownloadUrl = URL.createObjectURL(blob);
    return (
      <div>
        <h2>已選課程</h2>
        <table>
          <tbody>
            <tr key={"heading"}>{tablehead}</tr>
            {content}
          </tbody>
        </table>
        <div >
        <a style={{textDecoration:'none'}} download="已選課表" href={fileDownloadUrl}>
          <button className={styles.downloader}>輸出課表</button>
        </a>
        </div>
      </div>
    );
  }
}

export default LessonTable;
