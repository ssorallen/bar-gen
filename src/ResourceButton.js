/* @flow */

import * as React from 'react';
import cx from 'classnames';

type Props = {
  active: boolean,
  children?: React.Node,
  className?: string,
  onMouseDown: (event: SyntheticMouseEvent<HTMLElement>) => void,
  type: string,
};

export default function ResourceButton(props: Props) {
  const inputId = `resource-type-${props.type}`;
  return (
    <button
      className={cx('btn btn-rounded btn-sm', props.className)}
      disabled={props.active}
      onMouseDown={props.onMouseDown}
      type="button">
      <div className="form-check">
        <input
          checked={props.active}
          className="form-check-input mr-1"
          id={inputId}
          name="resource-type"
          readOnly
          type="radio"
        />
        <label className="form-check-label pr-2" htmlFor={inputId}>
          {props.children}
        </label>
      </div>
    </button>
  );
}
