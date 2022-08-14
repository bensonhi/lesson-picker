import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimeTable from './TimeTable/index.js';
import LessonTable from './LessonTable/index.js';
import ChosenTable from './chosenTable/index.js';

class SubmitForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      require:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      data:[],
      chosen:[],
      before:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      start:0
    }
    this.submitRequire = this.submitRequire.bind(this);
    this.choose = this.choose.bind(this);
    this.unchoose = this.unchoose.bind(this);
    this.changeRequire = this.changeRequire.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    fetch("https://classroombackend.herokuapp.com/",{method:'GET',
    headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
    .then(respond=>{
      this.setState({data:respond});
    })
    .catch(function(err) {
          console.log(err)
    })
  }

  uploadFile(e){
    let before=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    let chosen = []
    let require =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    let data =  this.state.data
    const reader = new FileReader();
    reader.onload = () => {
      var fileContentArray = reader.result.split(/\r\n|\n/);
      fileContentArray.forEach(number=>{
        number=parseInt(number)
        if(number!==''){
          for(let i=0;i<data.length;i++){
            if(number==data[i]["課號"]){
              chosen.push(data[i]);
              for(let j=0;j<data[i]['課'].length;j++){
                before[data[i]['課'][j]]=data[i]['課程名稱'][0].text
                require[data[i]['課'][j]]=data[i]['課程名稱'][0].text
              }
            }
          }
        }
      })
      this.setState({require:require})
      this.setState({before:before})
      this.setState({chosen:chosen})
    }
    reader.readAsText(e.target.files[0]);

  }

  changeAll(){
    let before=this.state.before
    if(before.includes(0)){
      before=before.map((item,index)=>{
        if(item==0){
          return 1
        }
        return item;
      })
    }
    else{
      before=before.map((item,index)=>{
        if(item==1){
          return 0
        }
        return item;
      })
    }
    this.setState({before:before})
  }


  submitRequire(){
    let require=[...this.state.before];
    this.setState({require:require});
    this.setState({start:1});
  }

  choose(item){
    let chosen = this.state.chosen
    let require =  this.state.require
    let before =  this.state.before
    for(let i=0;i<item['課'].length;i++){
      before[item['課'][i]]=item['課程名稱'][0].text
      require[item['課'][i]]=item['課程名稱'][0].text
    }
    chosen=[...chosen,item]
    this.setState({require:require})
    this.setState({before:before})
    this.setState({chosen:chosen})
  }

  unchoose(item){
    let chosen = this.state.chosen
    let require =  this.state.require
    for(let i=0;i<chosen.length;i++){
      if(chosen[i]["課號"]==item["課號"]){
        chosen.splice(i,1)
        break
      }
    }
    let before =  this.state.before
    for(let i=0;i<item['課'].length;i++){
      before[item['課'][i]]=0
      require[item['課'][i]]=0
    }
    this.setState({require:require})
    this.setState({before:before})
    this.setState({chosen:chosen})
  }

  changeRequire(num) {
    let before =  this.state.before
    if(before[num]==0)
    before[num]=1
    else if(before[num]==1)
    before[num]=0
    this.setState({before:before});
  }

  render(){
    return(
    <div>
      <div className='flex1'>
        <h1 className='security--header'>Lesson Picker</h1>
      </div>
      <div className='flex2'>
        <TimeTable changeAll={this.changeAll} changeRequire={this.changeRequire} before={this.state.before} chosen={this.state.chosen} submitRequire={this.submitRequire} uploadFile={this.uploadFile} />
        {this.state.chosen.length>0&&<ChosenTable chosen={this.state.chosen} choose={this.choose} unchoose={this.unchoose}/>}
      </div>
      {this.state.start>0&&<LessonTable chosen={this.state.chosen} choose={this.choose} unchoose={this.unchoose}  require= {this.state.require} data={this.state.data} />}
    </div>
    );
  }
}
  
  // ========================================
  
  ReactDOM.render(
    <SubmitForm />,
    document.getElementById('root')
  );