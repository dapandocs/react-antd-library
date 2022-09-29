import React, { Component } from "react";
import { closest, getDomIndex, getScrollElement, isTouchScreen } from "./util";

const DEFAULT_NODE_SELECTOR = "tr";
const DIRECTIONS = {
  TOP: 1,
  BOTTOM: 3,
};
const UNIT_PX = "px";
const DRAG_LIND_STYLE =
  "position:fixed;z-index:9999;height:0;" +
  "margin-top:-1px;border-bottom:dashed 2px red;display:none;";

class ReactDragListView extends Component {
  static defaultProps = {
    nodeSelector: DEFAULT_NODE_SELECTOR,
    ignoreSelector: "",
    enableScroll: true,
    scrollSpeed: 10,
    handleSelector: "",
    lineClassName: "",
    children: null,
  };
  dragLine: any;
  cacheDragTarget: any;
  scrollElement: any;
  direction: number;
  scrollTimerId: number;
  state: any;
  props: any;
  static DragColumn: any;

  constructor(props: any) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.autoScroll = this.autoScroll.bind(this);

    this.state = {
      fromIndex: -1,
      toIndex: -1,
    };
    this.scrollElement = null;
    this.scrollTimerId = -1;
    this.direction = DIRECTIONS.BOTTOM;
  }

  componentWillUnmount() {
    if (this.dragLine && this.dragLine.parentNode) {
      this.dragLine.parentNode.removeChild(this.dragLine);
      this.dragLine = null;
      this.cacheDragTarget = null;
    }
  }

  onTouchStart(e: any) {
    if (!isTouchScreen()) {
      return;
    }
    this.startDrag(e);
  }

  onMouseDown(e: any) {
    if (isTouchScreen()) {
      return;
    }
    this.startDrag(e);
  }

  onDragStart(e: any) {
    const target = this.getDragNode(e.target);
    const eventData = e;
    if (target) {
      const { parentNode } = target;
      eventData.dataTransfer.setData("Text", "");
      eventData.dataTransfer.effectAllowed = "move";
      parentNode.ondragenter = this.onDragEnter;
      parentNode.ondragover = function (ev: any) {
        ev.preventDefault();
        return true;
      };
      const fromIndex = getDomIndex(target, this.props.ignoreSelector);
      this.setState({ fromIndex, toIndex: fromIndex });
      this.scrollElement = getScrollElement(parentNode);
    }
  }

  onDragEnter(e: any) {
    const target = this.getDragNode(e.target);
    const eventData = e;
    let toIndex;
    if (target) {
      toIndex = getDomIndex(target, this.props.ignoreSelector);
      if (this.props.enableScroll) {
        this.resolveAutoScroll(eventData, target);
      }
    } else {
      toIndex = -1;
      this.stopAutoScroll();
    }
    this.cacheDragTarget = target;
    this.setState({ toIndex });
    this.fixDragLine(target);
  }

  onDragEnd(e: any) {
    const target = this.getDragNode(e.target);
    this.stopAutoScroll();
    if (target) {
      target.removeAttribute("draggable");
      target.ondragstart = null;
      target.ondragend = null;
      target.parentNode.ondragenter = null;
      target.parentNode.ondragover = null;
      if (
        this.state.fromIndex >= 0 &&
        this.state.fromIndex !== this.state.toIndex
      ) {
        this.props.onDragEnd(this.state.fromIndex, this.state.toIndex);
      }
    }
    this.hideDragLine();
    this.setState({ fromIndex: -1, toIndex: -1 });
  }

  getDragNode(target: any) {
    return closest(target, this.props.nodeSelector, this.dragList);
  }
  dragList(target: any, nodeSelector: any, dragList: any) {
    throw new Error("Method not implemented.");
  }

  getHandleNode(target: any) {
    return closest(
      target,
      this.props.handleSelector || this.props.nodeSelector,
      this.dragList
    );
  }

  getDragLine() {
    if (!this.dragLine) {
      this.dragLine = window.document.createElement("div");
      this.dragLine.setAttribute("style", DRAG_LIND_STYLE);
      window.document.body.appendChild(this.dragLine);
    }
    this.dragLine.className = this.props.lineClassName || "";
    return this.dragLine;
  }

  startDrag(e: any) {
    const handle = this.getHandleNode(e.target);
    if (handle) {
      const target =
        !this.props.handleSelector ||
        this.props.handleSelector === this.props.nodeSelector
          ? handle
          : this.getDragNode(handle);
      if (target) {
        handle.setAttribute("draggable", false);
        target.setAttribute("draggable", true);
        target.ondragstart = this.onDragStart;
        target.ondragend = this.onDragEnd;
      }
    }
  }

  resolveAutoScroll(e: any, target: any) {
    if (!this.scrollElement) {
      return;
    }
    const { top, height } = this.scrollElement.getBoundingClientRect();
    const targetHeight = target.offsetHeight;
    const { pageY } = e;
    const compatibleHeight = targetHeight * (2 / 3);
    this.direction = 0;
    if (pageY > top + height - compatibleHeight) {
      this.direction = DIRECTIONS.BOTTOM;
    } else if (pageY < top + compatibleHeight) {
      this.direction = DIRECTIONS.TOP;
    }
    if (this.direction) {
      if (this.scrollTimerId < 0) {
        // @ts-ignore
        this.scrollTimerId = setInterval(this.autoScroll, 20);
      }
    } else {
      this.stopAutoScroll();
    }
  }

  stopAutoScroll() {
    clearInterval(this.scrollTimerId);
    this.scrollTimerId = -1;
    this.fixDragLine(this.cacheDragTarget);
  }

  autoScroll() {
    const { scrollTop } = this.scrollElement;
    if (this.direction === DIRECTIONS.BOTTOM) {
      this.scrollElement.scrollTop = scrollTop + this.props.scrollSpeed;
      if (scrollTop === this.scrollElement.scrollTop) {
        this.stopAutoScroll();
      }
    } else if (this.direction === DIRECTIONS.TOP) {
      this.scrollElement.scrollTop = scrollTop - this.props.scrollSpeed;
      if (this.scrollElement.scrollTop <= 0) {
        this.stopAutoScroll();
      }
    } else {
      this.stopAutoScroll();
    }
  }

  hideDragLine() {
    if (this.dragLine) {
      this.dragLine.style.display = "none";
    }
  }

  fixDragLine(target: any) {
    const dragLine = this.getDragLine();
    if (!target || this.state.fromIndex < 0) {
      this.hideDragLine();
      return;
    }
    const { left, top, width, height } = target.getBoundingClientRect();
    const lineTop =
      this.state.toIndex < this.state.fromIndex ? top : top + height;
    if (this.props.enableScroll && this.scrollElement) {
      const { height: scrollHeight, top: scrollTop } =
        this.scrollElement.getBoundingClientRect();
      if (lineTop < scrollTop - 2 || lineTop > scrollTop + scrollHeight + 2) {
        this.hideDragLine();
        return;
      }
    }
    dragLine.style.left = left + UNIT_PX;
    dragLine.style.width = width + UNIT_PX;
    dragLine.style.top = lineTop + UNIT_PX;
    dragLine.style.display = "block";
  }

  render() {
    return (
      <div
        role="presentation"
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onMouseDown}
        ref={(c) => {
          // @ts-ignore
          this.dragList = c;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ReactDragListView;
