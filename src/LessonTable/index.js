import React from "react";
import "./index.css";

class LessonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumPerPage: 50,
      pageNum: 1,
      searchTerm: "",
    };
    this.setNumPerPage = this.setNumPerPage.bind(this);
    this.setPageNum = this.setPageNum.bind(this);
  }

  setNumPerPage(num) {
    this.setState({ NumPerPage: num });
  }
  setPageNum(num) {
    let length = this.props.data.reduce((acc, item) => {
      if (item["課"].length == 0) {
        return acc;
      }
      for (let i in item["課"]) {
        if (this.props.require[item["課"][i]] != 0) {
          return acc;
        }
      }

      return acc + 1;
    }, 0);
    let maxNum = length / this.state.NumPerPage;
    if (num >= 1 && num < maxNum + 1) this.setState({ pageNum: num });
  }

  setSearchTerm = (term) => {
    const self = this;
    let typingTimeout = 1;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      typingTimeout: setTimeout(function () {
        self.setState({ searchTerm: term });
      }, typingTimeout),
    });
  };

  render() {
    const require = this.props.require;
    const data = this.props.data;
    const unchoose = this.props.unchoose;
    const choose = this.props.choose;
    const chosen = this.props.chosen;
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
    let length = this.props.data.reduce((acc, item) => {
      if (item["課"].length == 0) {
        return acc;
      }
      for (let i in item["課"]) {
        if (this.props.require[item["課"][i]] != 0) {
          return acc;
        }
      }
      return acc + 1;
    }, 0);
    function search(item, term) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].text.includes(term)) return true;
      }
      return false;
    }
    let count = 0;
    let NumPerPage = this.state.NumPerPage;
    let pageNum = this.state.pageNum;
    let searchTerm = this.state.searchTerm;
    let content = data.map((item, index) => {
      if (item["課"].length == 0) {
        return;
      }
      for (let i in item["課"]) {
        if (require[item["課"][i]] != 0) {
          return;
        }
      }
      if (searchTerm !== "") {
        if (
          !item["課號"].includes(searchTerm) &&
          !search(item["課程名稱"], searchTerm) &&
          !search(item["班級"], searchTerm) &&
          !search(item["教師"], searchTerm)
        )
          return;
      }
      count++;
      if (count > NumPerPage * pageNum) return;
      if (count < NumPerPage * (pageNum - 1)) return;
      return <tr key={item["_id"]}>{rowContent(item)}</tr>;
    });
    let tablehead = [];
    if (typeof data[0] === "object") {
      tablehead = Object.entries(data[0]).reduce(
        (acc, text, index) => {
          if (index !== 0) return [...acc, <th key={text[0]}>{text[0]}</th>];
          return acc;
        },
        [<th key={"blank"}></th>]
      );
    }
    return (
      <div>
        <h2>可選課程 {length}</h2>
        <h5>
          每頁顯示 {this.state.NumPerPage} 筆 <br /> 目前頁數:{" "}
          {this.state.pageNum}
        </h5>
        <span>搜尋 </span>
        <input
          type="search"
          onChange={(e) => this.setSearchTerm(e.target.value)}
        ></input>
        <button onClick={() => this.setNumPerPage(25)}>25</button>
        <button onClick={() => this.setNumPerPage(50)}>50</button>
        <button onClick={() => this.setPageNum(this.state.pageNum + 1)}>
          next page
        </button>
        <button onClick={() => this.setPageNum(this.state.pageNum - 1)}>
          previous page
        </button>
        <table className="lessonTable">
          <tbody>
            <tr key={"heading"}>{tablehead}</tr>
            {content}
          </tbody>
        </table>
        <h2>目前頁數: {this.state.pageNum} </h2>
        <button onClick={() => this.setPageNum(this.state.pageNum + 1)}>
          next page
        </button>
        <button onClick={() => this.setPageNum(this.state.pageNum - 1)}>
          previous page
        </button>
      </div>
    );
  }
}

export default LessonTable;
