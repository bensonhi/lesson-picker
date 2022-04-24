import React from 'react';
import './index.css';

class TimeTable extends React.Component {
    constructor(props){
        super(props);
    }


    render(){
    let submitRequire =this.props.submitRequire
    let changeRequire =this.props.changeRequire
    let before =this.props.before
    let content = []
    let days=['','日','一','二','三','四','五','六']
    let lessonNum=['一','二','三','四','N','五','六','七','八','九','A','B','C','D']

    function getRow(i){
        let result=[<th>{lessonNum[i]}</th>]
        for(let j=0;j<7;j++){
            if(before[i+14*j]==0)
            result.push(<td><button onClick={()=>{changeRequire(i+14*j)}}></button></td>)
            else if(before[i+14*j]==1)
            result.push(<td><button onClick={()=>{changeRequire(i+14*j)}}>Not Available</button></td>)
            else
            result.push(<td><button onClick={()=>{changeRequire(i+14*j)}}>{before[i+14*j]}</button></td>)
        }
        return result
    }
    for(let i=0;i<14;i++){
        content.push(<tr>{getRow(i)}</tr>)
    }

    let tablehead=[]
    days.forEach((item,index)=>{
        tablehead.push(<th>{item}</th>)
    })

    return(
            <table className='timeTable'>
                <h2>目前課表</h2>
                <tbody>
                    <tr>
                        {tablehead}
                    </tr>
                    {content}
                </tbody>
                <button className='submitButton' onClick={()=>{submitRequire(before)}}>查詢</button>
            </table>
      );
    }
  }

export default TimeTable;