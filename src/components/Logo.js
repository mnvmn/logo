import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import * as orbitControls from 'three-orbit-controls';
import Scene from './Scene';

class Logo extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 200,
    height: 200,
  };

  componentDidMount() {
    this.scene = Scene.init(this.props.width, this.props.height);
    this.el.appendChild(this.scene.renderer.domElement);

    const OrbitControls = orbitControls(THREE);
    const controls = new OrbitControls(this.scene.camera, this.el); // eslint-disable-line no-new
    controls.rotateSpeed = -1;

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.el.removeChild(this.scene.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    window.cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.scene.renderFrame();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <div
        className="animation"
        style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}
        ref={(el) => {
          this.el = el;
        }}
      />
    );
  }
}

export default Logo;
