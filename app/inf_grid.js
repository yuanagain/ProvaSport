// Source: https://github.com/ggordan/react-infinite-grid
// Author: Gordan Grasarevic
// Date Accessed: April 13, 2016
import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteGrid from './inf_grid/src/grid';

class ExampleItem extends React.Component {

  static get propTypes() {
    return {
      index: React.PropTypes.number
    };
  }

  render() {
    return(
      <div className='example'>
        Name is {this.props.index}
      </div>
      <div className='example'>
        Score is {this.props.index}
      </div>
    );
  }

}

// Dummy values
// var items = [];
// var num_players = 6;
// var names = ['James Smith', 'Jen Johnson', 'Johhny Jones', 'Jackie Anderson', 'Josh Watson', 'Jill Jameson'];
// var scores = ['1 2 3 4 5', '6 7 8 9 10', '1 2 3 4 5', '6 7 8 9 10', '1 2 3 4 5', '6 7 8 9 10'];
// for (var i = 0; i < num_players; i++) {
//   items.push(<Example name={names[i]} score={scores[i]}/>)
// }

// Dummy items
let items = [];
for (let i = 0; i <= 1000; i++) {
  items.push(<ExampleItem index={i} />);
}

const lazyCallback = (index) => {
  console.log(index);
}

ReactDOM.render(<InfiniteGrid entries={items} wrapperHeight={400} lazyCallback={lazyCallback} />, document.getElementById('newsfeed_container'));
