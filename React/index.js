/*
 * @LastEditTime: 2023-04-06 14:48:28
 * @LastEditors: jinxiaojian
 */
import React, {memo, useEffect} from 'react';
import {compose} from 'lodash/fp';
import {connect} from '@common/easy';
import {errorDecorator} from '@common/highErrorBoundary';
import {getPic} from './tool'
// import './index.cssmodule.styl';

function Line({
  top = 8,
  left = 8
}) {
  useEffect(() => {
    getPic({})
  }, [])
  return (
    <canvas id="canvas" className='positionR' style={{
      width: 1920,
      height: 1080,
      top,
      left
    }}></canvas>
  );
}
export default compose(
  errorDecorator(),
  connect(
    // (state, mapState) => mapState(state.Name, [

    // ]),
    // (dispatch, mapActions) => mapActions(actions, [

    // ])
  ),

  memo
)(Line);
