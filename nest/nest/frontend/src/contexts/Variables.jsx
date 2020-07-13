var defaultWidth =
  window.screen.width > 768
    ? (window.screen.width * 1) / 3
    : window.screen.width;

var style = {
  Wrapper: {},
  Containers: {
    DefaultStyle: {
      position: 'fixed',
      width: defaultWidth,
      padding: '10px 10px 10px 20px',
      zIndex: 9998,
      WebkitBoxSizing: '',
      MozBoxSizing: '',
      boxSizing: '',
      height: 'auto',
      display: 'inline-block',
      border: '0',
      fontSize: '14px',
      WebkitFontSmoothing: 'antialiased',
      fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
      fontWeight: '400',
      color: '#FFFFFF',
    },

    tl: {
      top: '0px',
      bottom: 'auto',
      left: '0px',
      right: 'auto',
    },

    tr: {
      top: '0px',
      bottom: 'auto',
      left: 'auto',
      right: '0px',
    },

    tc: {
      top: '0px',
      bottom: 'auto',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2),
    },

    bl: {
      top: 'auto',
      bottom: '0px',
      left: '0px',
      right: 'auto',
    },

    br: {
      top: 'auto',
      bottom: '0px',
      left: 'auto',
      right: '0px',
    },

    bc: {
      top: 'auto',
      bottom: '0px',
      margin: '0 auto',
      left: '50%',
      marginLeft: -(defaultWidth / 2),
    },
  },

  NotificationItem: {
    DefaultStyle: {
      position: 'relative',
      width: '100%',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '14px',
      margin: '10px 0 0',
      padding: '10px',
      display: 'block',
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      opacity: 0,
      transition: 'all 0.5s ease-in-out',
      WebkitTransform: 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)',
      willChange: 'transform, opacity',

      isHidden: {
        opacity: 0,
      },

      isVisible: {
        opacity: 1,
      },
    },

    success: {
      borderTop: 0,
      backgroundColor: '#a1e82c',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    error: {
      borderTop: 0,
      backgroundColor: '#fc727a',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    warning: {
      borderTop: 0,
      backgroundColor: '#ffbc67',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },

    info: {
      borderTop: 0,
      backgroundColor: '#63d8f1',
      WebkitBoxShadow: 0,
      MozBoxShadow: 0,
      boxShadow: 0,
    },
  },

  Title: {
    DefaultStyle: {
      fontSize: '30px',
      margin: '0',
      padding: 0,
      fontWeight: 'bold',
      color: '#FFFFFF',
      display: 'block',
      left: '15px',
      position: 'absolute',
      top: '50%',
      marginTop: '-15px',
    },
  },

  MessageWrapper: {
    DefaultStyle: {
      marginLeft: '55px',
      marginRight: '30px',
      padding: '0 12px 0 0',
      color: '#FFFFFF',
      maxWidthwidth: '89%',
    },
  },

  Dismiss: {
    DefaultStyle: {
      fontFamily: 'inherit',
      fontSize: '21px',
      color: '#000',
      float: 'right',
      position: 'absolute',
      right: '10px',
      top: '50%',
      marginTop: '-13px',
      backgroundColor: '#FFFFFF',
      display: 'block',
      borderRadius: '50%',
      opacity: '.4',
      lineHeight: '11px',
      width: '25px',
      height: '25px',
      outline: '0 !important',
      textAlign: 'center',
      padding: '6px 3px 3px 3px',
      fontWeight: '300',
      marginLeft: '65px',
    },
  },

  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '2px',
      padding: '6px 20px',
      fontWeight: 'bold',
      margin: '10px 0 0 0',
      border: 0,
    },

    success: {
      backgroundColor: '#a1e82c',
      color: '#ffffff',
    },

    error: {
      backgroundColor: '#fc727a',
      color: '#ffffff',
    },

    warning: {
      backgroundColor: '#ffbc67',
      color: '#ffffff',
    },

    info: {
      backgroundColor: '#63d8f1',
      color: '#ffffff',
    },
  },

  ActionWrapper: {
    DefaultStyle: {
      margin: 0,
      padding: 0,
    },
  },
};

var dataGraph = {
  labels: [
    '6:00AM',
    '9:00AM',
    '12:00PM',
    '3:00PM',
    '6:00PM',
    '9:00PM',
    '12:00AM',
    '3:00AM',
    '6:00AM',
  ],
  series: [
    [87, 285, 250, 362, 604, 586, 798, 695, 787],
    [23, 213, 67, 128, 320, 259, 407, 278, 183],
    [67, 252, 143, 240, 472, 435, 605, 467, 450],
  ],
};

var optionsGraph = {
  low: 0,
  high: 800,
  showArea: false,
  height: '245px',
  axisX: {
    showGrid: false,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50,
  },
};

var responsiveGraph = [
  [
    'screen and (max-width: 640px)',
    {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        },
      },
    },
  ],
];

var legendGraph = {
  names: ['Successful', 'Pending', 'Canceled'],
  types: ['info', 'warning', 'danger', 'warning'],
};

module.exports = {
  style,
  dataGraph,
  optionsGraph,
  responsiveGraph,
  legendGraph,
};
