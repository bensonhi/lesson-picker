import React from 'react';
import './index.css';

class LessonTable extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
    
    const require =this.props.require
    const data=this.props.data;
    const unchoose =this.props.unchoose
    const choose =this.props.choose;
    const chosen =this.props.chosen
    function fieldContent(spans){
        return spans.map((item,index)=>{
           
            return <a key={"https://aps.ntut.edu.tw/course/tw/"+item.href} href={"https://aps.ntut.edu.tw/course/tw/"+item.href} target="_blank" >{item.text}</a>
        })
    }
    function rowContent(item){
        let initial
        if(chosen.includes(item)){
            initial=[<td key={"choose"}><button onClick={()=>{unchoose(item)}}>去掉這個</button></td>]
        }
        else{
            initial=[<td key={"unchoose"}><button onClick={()=>{choose(item)}}>選這個</button></td>]
        }
        return Object.entries(item).reduce((acc,text,index)=>{
            let array=[...acc]
            if( !Array.isArray(text[1]) && index!=0 && typeof text[1] !== 'object')
            array.push(<td key={text[0]}>{text[1]}</td>)
            else if (Array.isArray(text[1])  && index!==26)
            array.push(<td key={text[0]}>{fieldContent(text[1])}</td>)
            return array
        },initial)
        
    }
    let content = data.map((item,index)=>{
        if(item['課'].length==0){
            return
        }
        for (let i in item['課']){
            if(require[item['課'][i]]!=0){
                return
            }
            
        }
        return <tr key={item['_id']}>{rowContent(item)}</tr>
    })
    let tablehead=[]
    if(typeof data[0] === 'object'){
        tablehead = Object.entries(data[0]).reduce((acc,text,index)=>{
                if(index!==0)
                return [...acc,<th key={text[0]}>{text[0]}</th>]
                return acc
            },[<th key={"blank"}></th>])
    }
    return(
        <div>
            <h2>可選課程</h2>
            <table className='lessonTable'>
                <tbody >
                    <tr key={"heading"}>
                        {tablehead}
                    </tr>
                    {content}
                </tbody>
            </table>
        </div>
      );
    }
  }

export default LessonTable;