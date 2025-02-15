import React, { Component } from 'react';
import DatGUI from 'DatGUI';
import Home from 'Containers/Home';
import GUIContext, { defaults } from 'GUIContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaults,
      updateGUI: this.handleUpdate,
    };
  }

  handleUpdate = (newData) => {
    const newState = { data: newData };
    this.setState({ ...this.state, ...newState });
  };

  render() {
    return (
      <GUIContext.Provider value={this.state}>
        <DatGUI />
        <Home />
      </GUIContext.Provider>
    );
  }
}
export default App;
