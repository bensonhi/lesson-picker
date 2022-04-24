import React from 'react';
import './index.css';


class LessonTable extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
    const unchoose =this.props.unchoose
    const choose =this.props.choose;
    const chosen =this.props.chosen
    let shownColumn=[0,1,3,5,6,7,8,16,21]
    function fieldContent(spans){
        return spans.map((item,index)=>{
           
            return <a href={"https://aps.ntut.edu.tw/course/tw/"+item.href} target="_blank" >{item.text}</a>
        })
    }
    function rowContent(item){
        let initial
        if(chosen.includes(item)){
            initial=[<td><button onClick={()=>{unchoose(item)}}>去掉這個</button></td>]
        }
        else{
            initial=[<td><button onClick={()=>{choose(item)}}>選這個</button></td>]
        }
        return Object.entries(item).reduce((acc,text,index)=>{
            let array=[...acc]
            if(shownColumn.includes(index)){
                if( !Array.isArray(text[1]) && index!=0 && typeof text[1] !== 'object')
                    array.push(<td>{text[1]}</td>)
                else if (Array.isArray(text[1])  && index!==26)
                    array.push(<td>{fieldContent(text[1])}</td>)
            }
            return array
        },initial)
        
    }
    let content = chosen.map((item,index)=>{
        return <tr>{rowContent(item)}</tr>
    })
    let tablehead=[]
    if(typeof chosen[0] === 'object'){
        tablehead = Object.entries(chosen[0]).reduce((acc,text,index)=>{
                if(index!==0 && shownColumn.includes(index))
                return [...acc,<th>{text[0]}</th>]
                return acc
            },[<th></th>])
    }
    return(
        <table className='chosenTable'>
            <h2>已選課程</h2>
            <tbody>
                <tr>
                    {tablehead}
                </tr>
                {content}
            </tbody>
        </table>
      );
    }
  }

export default LessonTable;