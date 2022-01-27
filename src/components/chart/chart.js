import $ from 'jquery';

let gradientIterator = 0;

function polarToCartesianCoords(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees + 90) * Math.PI) / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
}

class Arc {
  start;

  end;

  largeArcFlag;

  radius;

  gradientId;

  constructor(x, y, radius, startAngle, endAngle) {
    this.radius = radius;
    this.start = polarToCartesianCoords(x, y, radius, startAngle);
    this.end = polarToCartesianCoords(x, y, radius, endAngle);
    this.largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    this.gradientId = `graphGradient${gradientIterator}`;
    gradientIterator += 1;
  }

  getD() {
    return [
      'M', this.end.x, this.end.y,
      'A', this.radius, this.radius, 0, this.largeArcFlag, 0, this.start.x, this.start.y,
    ].join(' ');
  }

  getGradientAttrs() {
    return {
      id: this.gradientId,
      x1: this.start.x,
      y1: this.start.y,
      x2: this.end.x,
      y2: this.end.y,
      gradientUnits: 'userSpaceOnUse',
    };
  }

  getPathAttrs() {
    return {
      fill: 'none',
      stroke: `url(#${this.gradientId})`,
      'stroke-width': 4,
      d: this.getD(),
    };
  }

  createPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const attrs = this.getPathAttrs();

    Object.keys(attrs).forEach((key) => {
      path.setAttribute(key, attrs[key]);
    });

    return path;
  }

  createGradient([to, from]) {
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    const attrs = this.getGradientAttrs();

    Object.keys(attrs).forEach((key) => {
      gradient.setAttribute(key, attrs[key]);
    });

    const stopFrom = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopFrom.setAttribute('stop-color', from);

    const stopTo = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stopTo.setAttribute('stop-color', to);
    stopTo.setAttribute('offset', 1);

    gradient.append(stopFrom);
    gradient.append(stopTo);

    return gradient;
  }
}

$('[data-chart]').each(function () {
  const $chart = $(this);
  const $graph = $chart.find('.chart__graph');
  const $defs = $graph.find('.chart__defs');
  const items = $chart.data('chart');
  let prevDegree = 0;

  items.forEach((props) => {
    if (!props.percent) return;
    const nextDegree = (props.percent / 100) * 360;
    const arc = new Arc(60, 60, 56, prevDegree + 1, prevDegree + nextDegree - 1);
    prevDegree += nextDegree;

    const path = arc.createPath();
    const gradient = arc.createGradient(props.color);
    $graph.append(path);
    $defs.append(gradient);
  });
});
