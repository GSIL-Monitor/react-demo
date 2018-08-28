import React from 'react';
import { Link } from 'react-router-dom';
import Wrap from '@comps/PeopleWrap';

export default () => <Wrap>
  <p>This is Test2 !</p>
  <p><Link to="/tests/test1/test2-1/">Go to Test2-1</Link></p>
</Wrap>