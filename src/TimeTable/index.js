import React from 'react';
import './index.css';

class TimeTable extends React.Component {
    constructor(props){
        super(props);
        this.getContent = this.getContent.bind(this);
        this.getRow = this.getRow.bind(this);
    }

    getRow(i){
        let lessonNum=['一','二','三','四','N','五','六','七','八','九','A','B','C','D']
        let changeRequire =this.props.changeRequire
        let before =this.props.before
        let result=[<th key={lessonNum[i]}>{lessonNum[i]}</th>]
        for(let j=0;j<7;j++){
            if(before[i+14*j]==0)
            result.push(<td key={i+14*j}><button onClick={()=>{changeRequire(i+14*j)}}></button></td>)
            else if(before[i+14*j]==1)
            result.push(<td key={i+14*j}><button onClick={()=>{changeRequire(i+14*j)}}>Not Available</button></td>)
            else
            result.push(<td key={i+14*j}><button onClick={()=>{changeRequire(i+14*j)}}>{before[i+14*j]}</button></td>)
        }
        return result
    }

    getContent(){
        let content = []
        for(let i=0;i<14;i++){
            content.push(<tr key={i}>{this.getRow(i)}</tr>)
        }
        return content;
    }

    render(){
    let submitRequire =this.props.submitRequire
    let days=['','日','一','二','三','四','五','六']

    let tablehead=[]
    days.forEach((item,index)=>{
        tablehead.push(<th key={item}>{item}</th>)
    })

    return(
        <div  className='timeTable'>
            <h2>目前課表</h2>
            <table  style={{"table-layout": "fixed",}}>
                <tbody>
                    <tr>
                        {tablehead}
                    </tr>
                    {this.getContent()}
                </tbody>
            </table>
            <div>
                <button className='submitButton' onClick={()=>{this.props.changeAll()}}>全選</button>
                <button className='submitButton' onClick={()=>{submitRequire()}}>查詢</button>            </div>
        </div>
      );
    }
  }

export default TimeTable;