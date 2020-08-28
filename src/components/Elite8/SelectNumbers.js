import React, { useState, useEffect } from "react";

export default function ComponentSelectNumbers(props) {
  //state valiable 'selected'
  //update this state varaible using 'setSelected' function call
  //this way on a button call e.g.
  // <button onClick={() => setSelected([4, 5 ,6 ])}}>
  //default value is-> an empty array [], useState([]);

  const [selected, setSelected] = useState([]);
  const [ballsArray, setBallsArray] = useState(initBalls());

  useEffect(() => {
    // initBalls();
  });

  function Ball(props) {
    return (
      <div className={"elite8-ball " + (props.isSelected ? "selected" : "")}>
        {props.number}
      </div>
    );
    //  else return <div className="elite8-ball">{props.number}</div>;
  }
  function onBallClicked(number) {
    console.log("Clicked", number, "selected:",  selected );
    //check if selected array has the number
    if (selected.includes(number)) {
      //if yes, remove the number from array
      removeFromSelectedNumbers(number);
    } else {
      //if no, add the number in array
      addToSelectedNumbers(number);
    }
   
  }

  function initBalls() {
    var mArray = [];
    // function for loop of Balls

    for (let i = 1; i <= 46; i++) {
      mArray.push(
        <div onClick={() => onBallClicked(i)}>
          <Ball number={i} isSelected={selected.includes(i)} />
        </div>
      );
    }
    return mArray;
  }

  function addToSelectedNumbers(number) {
    // tempArray.push(number);
    //setSelected(selected.concat(number));
    // var tArr = [...selected];
    // tArr.push(number);
    setSelected((selected) =>[...selected, selected.length,number]);
    // console.log("add function", selected);
  }

  function removeFromSelectedNumbers(number) {}

  return (
    <section>
      <div className="PickNumbers-wrapper">
        <div className="PickNumbers-left">
          <div className="PickNumbers-header"> Pick Your Numbers </div>
          <div className="PickNumbers-header-sub">
            Select 8 numbers in total by clicking the the lottery balls below.
          </div>
          <div className="all-PickNumbers-box">
            {/* <CreateBalls /> */}
            {ballsArray}
          </div>
        </div>
        <div className="PickNumbers-right">
          <div className="PickNumbers-right-heading">
            You can use <span className="orange-text"> Powerplays </span> to
            edit your selections during the live draw!
          </div>
          <div className="PickNumbers-right-img">
            <img
              src={require("../../assets/images/elite8-promo/group-34.png")}
            />
          </div>
          <div className="PickNumbers-powerplays" />
          <div className="PickNumbers-selected-numbers" />
        </div>
      </div>
    </section>
  );
}
