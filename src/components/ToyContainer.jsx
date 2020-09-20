import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  let toys = props.toys.map(el => <ToyCard key={el.id} toy={el} deleteHandler={props.deleteHandler} clickHandler={props.clickHandler}/>)

  return(
    <div id="toy-collection">
      {toys}
    </div>
  );
}

export default ToyContainer;
