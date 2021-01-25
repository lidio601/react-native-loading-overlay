import { makeLoggers } from '@lidio601/logger';
import React, { PureComponent } from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';

const { log } = makeLoggers('LoadingOverlay');

type Props = {
  loading?: boolean;
};

type State = {
  opacity: Animated.Value;
  loading: boolean;
};

class LoadingOverlay extends PureComponent<Props, State> {
  _animation: Animated.CompositeAnimation;

  state = {
    loading: false,
    opacity: new Animated.Value(0.4),
  };

  _isLoadingFromProps(props: Props): boolean {
    if (props.loading === undefined) {
      // defaults to true
      return true;
    }

    return props.loading;
  }

  constructor(props: Props) {
    super(props);

    this._animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          duration: 1500,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacity, {
          duration: 500,
          toValue: 0.4,
          useNativeDriver: true,
        }),
      ]),
    );
  }

  public start() {
    if (this.state.loading) {
      return;
    }

    log('start');

    this._animation.start();

    this.setState({
      loading: true,
    });
  }

  public stop() {
    if (!this.state.loading) {
      return;
    }

    log('stop');

    this._animation.stop();

    this.setState({
      loading: false,
    });
  }

  componentDidMount() {
    if (this._isLoadingFromProps(this.props)) {
      this.start();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidUpdate(newProps: Props) {
    if (
      this._isLoadingFromProps(this.props) ===
      this._isLoadingFromProps(newProps)
    ) {
      // ignore if unchanged
      return;
    }

    if (this._isLoadingFromProps(newProps)) {
      if (!this.state.loading) {
        this.start();
      }
    } else {
      if (this.state.loading) {
        this.stop();
      }
    }
  }

  render() {
    const { opacity, loading } = this.state;

    if (!loading) {
      return null;
    }

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <ActivityIndicator size="large" color="white" />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: 'center',
    backgroundColor: '#00000022',
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 150,
  },
});

export default LoadingOverlay;
