import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import { Portal } from "react-portal";

export const popperPlacementPositions = [
  "auto",
  "auto-left",
  "auto-right",
  "bottom",
  "bottom-end",
  "bottom-start",
  "left",
  "left-end",
  "left-start",
  "right",
  "right-end",
  "right-start",
  "top",
  "top-end",
  "top-start"
];

export default class PopperComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    hidePopper: PropTypes.bool,
    popperComponent: PropTypes.element,
    popperModifiers: PropTypes.object, // <datepicker/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <datepicker/> props
    popperContainer: PropTypes.func,
    portal: PropTypes.bool,
    portalNode: PropTypes.instanceOf(Element),
    positionFixed: PropTypes.bool, // <datepicker/> props
    targetComponent: PropTypes.element
  };

  static get defaultProps() {
    return {
      hidePopper: true,
      popperModifiers: {
        preventOverflow: {
          enabled: true,
          escapeWithReference: true,
          boundariesElement: "viewport"
        }
      },
      popperPlacement: "bottom-start"
    };
  }

  render() {
    const {
      className,
      hidePopper,
      popperComponent,
      popperModifiers,
      popperPlacement,
      positionFixed,
      targetComponent
    } = this.props;

    let popper;

    if (!hidePopper) {
      const classes = classnames("react-datepicker-popper", className);
      popper = (
        <Popper
          modifiers={popperModifiers}
          placement={popperPlacement}
          positionFixed={positionFixed}
        >
          {({ ref, style, placement }) => (
            <div
              ref={ref}
              style={style}
              className={classes}
              data-placement={placement}
            >
              {popperComponent}
            </div>
          )}
        </Popper>
      );
    }

    if (this.props.popperContainer) {
      popper = React.createElement(this.props.popperContainer, {}, popper);
    }

    if (popper && this.props.portal) {
      popper = <Portal node={this.props.portalNode}>{popper}</Portal>;
    }

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className="react-datepicker-wrapper" ref={ref}>
              {targetComponent}
            </div>
          )}
        </Reference>
        {popper}
      </Manager>
    );
  }
}
