import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import {Quizpage} from "./Quizpage";


export default class App extends Component {
constructor(props){
  super(props)
  this.state = {
    cat : '',
    questions : '',
    mainSet : [],
    count: 60,
    setReady : 1,
    seconds: 1,
    hi:''
  }
}

async getQA  () {

if(this.state.cat == 'any'){
var {data} = await axios.get('https://opentdb.com/api.php?amount=10');

this.setState({questions: data.results})
}
else if(this.state.cat!=''){
  var {data} = await axios.get(`https://opentdb.com/api.php?amount=10&category=${this.state.cat}`);


this.setState({questions: data.results})
}
console.log(this.state.questions)
console.log(this.state.cat)

}

getCategory = (eve) => {
this.setState({cat:eve.target.value})

}




prep = (item) => {

   var sets = {
   
      q: '',
      opts: '',
      correctAns : ''
    }

  sets.q = item.question

item.incorrect_answers.push(item.correct_answer)
sets.opts = item.incorrect_answers


sets.correctAns = item.correct_answer

this.state.mainSet.push(sets)

 
}



render(){


  return (
    <div>

        {this.state.questions!=''? 
        <div>
   
      { this.state.questions.map( item => (
 
          this.prep(item)
    
       ) )}

      
      



      <Quizpage value ={this.state.mainSet}/>
      



  
        </div> : 

        <div className="common"> 
         <h1 className="common">Welcome to quiz</h1>
         <p className="common">Select category: </p>
      <select onChange = {this.getCategory} className="common">
      	<option>choose</option>
			<option value="any">Any Category</option>
			<option value="9">General Knowledge</option>
      <option value="10">Entertainment: Books</option>
      <option value="11">Entertainment: Film</option>
      <option value="12">Entertainment: Music</option>
      <option value="13">Entertainment: Musicals &amp; Theatres</option>
      <option value="14">Entertainment: Television</option>
      <option value="15">Entertainment: Video Games</option>
      <option value="16">Entertainment: Board Games</option>
      <option value="17">Science &amp; Nature</option>
      <option value="18">Science: Computers</option>
      <option value="19">Science: Mathematics</option>
      <option value="20">Mythology</option>
      <option value="21">Sports</option>
      <option value="22">Geography</option>
      <option value="23">History</option>
      <option value="24">Politics</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="27">Animals</option>
      <option value="28">Vehicles</option>
      <option value="29">Entertainment: Comics</option>
      <option value="30">Science: Gadgets</option>
      <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
      <option value="32">Entertainment: Cartoon &amp; Animations</option>		
      </select>
      <br/>
       <br/>
    
      <button  className='GoToQuiz' type='button' type='button' onClick={()=>this.getQA()}>Go To Quiz</button>
        
        
        
        
        
        
        
        </div>
        
        }

    


    </div>
  );
}
}
