import React from 'react';
import { Link } from 'react-router-dom';
import Wrap from '@comps/PeopleWrap';

export default class extends React.Component {
  render() {
    return <Wrap>
      <p>This is Tests !</p>
      <p><Link to="/test/test1/">Go to Test1</Link></p>
    </Wrap>
  }
}