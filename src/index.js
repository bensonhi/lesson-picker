import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TimeTable from "./TimeTable/index.js";
import LessonTable from "./LessonTable/index.js";
import ChosenTable from "./chosenTable/index.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      require: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0,
      ],
      data: [],
      chosen: [],
      start: 0,
    };
    this.choose = this.choose.bind(this);
    this.unchoose = this.unchoose.bind(this);
    this.changeRequire = this.changeRequire.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    fetch("https://classroombackend.herokuapp.com/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((respond) => {
        this.setState({ data: respond });
        let e = cookies.get("Chosen");
        console.log(e);
        let chosen = [];
        let require = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ];
        let data = this.state.data;
        e.forEach((number) => {
          number = parseInt(number.replace("\n", ""));
          if (number !== "") {
            for (let i = 0; i < data.length; i++) {
              if (number == data[i]["課號"]) {
                chosen.push(data[i]);
                for (let j = 0; j < data[i]["課"].length; j++) {
                  require[data[i]["課"][j]] = data[i]["課程名稱"][0].text;
                }
              }
            }
          }
        });
        this.setState({ require: require });
        this.setState({ chosen: chosen });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  uploadFile(e) {
    let chosen = [];
    let require = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let data = this.state.data;
    const reader = new FileReader();
    reader.onload = () => {
      var fileContentArray = reader.result.split(/\r\n|\n/);
      fileContentArray.forEach((number) => {
        number = parseInt(number);
        if (number !== "") {
          for (let i = 0; i < data.length; i++) {
            if (number == data[i]["課號"]) {
              chosen.push(data[i]);
              for (let j = 0; j < data[i]["課"].length; j++) {
                require[data[i]["課"][j]] = data[i]["課程名稱"][0].text;
              }
            }
          }
        }
      });
      this.setState({ require: require });
      this.setState({ chosen: chosen });
    };
    reader.readAsText(e.target.files[0]);
  }

  changeAll() {
    let require = this.state.require;
    if (require.includes(0)) {
      require = require.map((item, index) => {
        if (item == 0) {
          return 1;
        }
        return item;
      });
    } else {
      require = require.map((item, index) => {
        if (item == 1) {
          return 0;
        }
        return item;
      });
    }
    this.setState({ require: require });
  }

  choose(item) {
    let chosen = this.state.chosen;
    let require = this.state.require;
    for (let i = 0; i < item["課"].length; i++) {
      require[item["課"][i]] = item["課程名稱"][0].text;
    }
    chosen = [...chosen, item];
    this.setState({ require: require });
    this.setState({ chosen: chosen });
  }

  unchoose(item) {
    let chosen = this.state.chosen;
    let require = this.state.require;
    for (let i = 0; i < chosen.length; i++) {
      if (chosen[i]["課號"] == item["課號"]) {
        chosen.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < item["課"].length; i++) {
      require[item["課"][i]] = 0;
    }
    this.setState({ require: require });
    this.setState({ chosen: chosen });
  }

  changeRequire(num) {
    let require = this.state.require;
    if (require[num] == 0) require[num] = 1;
    else if (require[num] == 1) require[num] = 0;
    this.setState({ require: require });
  }

  render() {
    return (
      <div>
        <div className="flex1">
          <h1 className="security--header">Lesson Picker for NTUT</h1>
        </div>
        <div className="flex2">
          <TimeTable
            require={this.state.require}
            changeAll={this.changeAll}
            changeRequire={this.changeRequire}
            chosen={this.state.chosen}
            uploadFile={this.uploadFile}
          />
          {this.state.chosen.length > 0 && (
            <ChosenTable
              chosen={this.state.chosen}
              choose={this.choose}
              unchoose={this.unchoose}
            />
          )}
        </div>
        {
          <LessonTable
            chosen={this.state.chosen}
            choose={this.choose}
            unchoose={this.unchoose}
            require={this.state.require}
            data={this.state.data}
          />
        }
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<SubmitForm />, document.getElementById("root"));
