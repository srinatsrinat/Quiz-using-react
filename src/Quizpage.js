import React, { Component } from "react";
import "./style.css";

export class Quizpage extends React.Component{
constructor(props){
  super(props)
  this.state = {
    seconds: 60,
    i:0,
    checkArr : [],
    count:0

  }
}

componentWillMount(){
this.props.value.map(item=>{item.opts.sort(this.func)})
}

  componentDidMount() {

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
    }, 1000);

 //console.log(this.props)
  }

showAgain(){
  this.setState({seconds: 60})
this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
    }, 1000);


}
  
    stopCount() {
    clearInterval(this.timer);


    if(this.state.i<=9)
    {
    this.setState({ i: this.state.i + 1 }) 
    this.showAgain()
    }



  }

checkAnswer(eve){
if(eve.target.value)
this.state.checkArr.push(eve.target.value)
else
this.state.checkArr.push('')
this.stopCount()
}

finalRes(){
   clearInterval(this.timer)
  console.log(this.state.checkArr,this.props.value)
for(var k =0; k<10;k++)
{
  if(this.state.checkArr[k]==this.props.value[k].correctAns)
  {this.state.count += 1}
}



}

func(a, b) {  
  return 0.5 - Math.random();
}  

render(){

return(


<div>
{this.state.seconds==0 && this.state.i<=9 ? this.stopCount() : 


this.state.i<=9 ?

<div>
Timer: {this.state.seconds} seconds left


 

         <p className="common">
               <b> Question: {this.state.i+1} </b><br/><br/>
               {this.props.value[this.state.i].q}
         </p>
         <p className="common"> 
               <b>Choose the right option: </b> <br/> <br/>
               {
this.props.value[this.state.i].opts.map( it => (
                <>
                <button className='optBtn' value={it} onClick={e=>this.checkAnswer(e)}> {it}  </button> 
                 <br/>
                 </>
                 ) )}
                <br/> 
         </p> 

</div>
:
<div className="common">
<h1>Game Over {this.finalRes()} </h1> <br/> 

<h1>You scored {this.state.count}/10! </h1> <br/>

<a href='https://somequiz.stackblitz.io'><button className='opt1Btn'> Play Again </button></a>

<div className = 'final'>

<h2 >Your Answers <br/> </h2>

{this.state.checkArr.map((item,index)=>{

  return(
    
<p key={index}>
<b>Q{index+1}:</b> {item} 
 
 </p>
 
  )
})}
<br/>
<br/>
</div >



<div className = 'final'>

<h2>Correct Answers <br/> </h2>


{this.props.value.map((item,index)=>{

return(

<p key={index}>
 <b>Q{index+1}:</b> {item.correctAns}
 
 </p>

)

})}
<br/>
<br/>
</div>




</div>












}

</div>























)}



}