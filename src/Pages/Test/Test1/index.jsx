import React from 'react';
import { Link } from 'react-router-dom';
import Wrap from '@comps/PeopleWrap';

export default () => <Wrap>
  <p>This is Test1 !</p>
  <p><Link to="/tests/test1/test1-1/">Go to Test1-1</Link></p>
</Wrap>