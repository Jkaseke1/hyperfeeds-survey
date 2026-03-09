// ============================================================
// SIMPLE CHART RENDERING — No external dependencies
// ============================================================

const Charts = {
  // Render a horizontal bar chart
  renderBarChart(data, maxValue) {
    return data.map(item => {
      const percentage = (item.value / maxValue) * 100;
      return `
        <div class="chart-bar-item">
          <div class="chart-bar-label">${item.label}</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${percentage}%; background: ${item.color || '#3B82F6'}"></div>
            <span class="chart-bar-value">${item.value}</span>
          </div>
        </div>
      `;
    }).join('');
  },

  // Render a simple donut chart (using conic-gradient)
  renderDonutChart(segments) {
    let currentAngle = 0;
    const gradientStops = segments.map(seg => {
      const startAngle = currentAngle;
      currentAngle += (seg.value / 100) * 360;
      return `${seg.color} ${startAngle}deg ${currentAngle}deg`;
    }).join(', ');

    const legend = segments.map(seg => `
      <div class="chart-legend-item">
        <span class="chart-legend-color" style="background: ${seg.color}"></span>
        <span class="chart-legend-label">${seg.label}</span>
        <span class="chart-legend-value">${seg.value}%</span>
      </div>
    `).join('');

    return `
      <div class="chart-donut-container">
        <div class="chart-donut" style="background: conic-gradient(${gradientStops})">
          <div class="chart-donut-hole"></div>
        </div>
        <div class="chart-legend">${legend}</div>
      </div>
    `;
  },

  // Render a scale rating visualization
  renderScaleChart(question, average, responses) {
    const bars = [1, 2, 3, 4, 5].map(rating => {
      const count = responses.filter(r => r === rating).length;
      const percentage = responses.length > 0 ? (count / responses.length) * 100 : 0;
      const isAvg = Math.round(parseFloat(average)) === rating;
      
      return `
        <div class="scale-bar ${isAvg ? 'is-average' : ''}">
          <div class="scale-bar-label">${rating}</div>
          <div class="scale-bar-fill" style="height: ${percentage}%">
            <span class="scale-bar-count">${count}</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="scale-chart">
        <div class="scale-chart-title">${question}</div>
        <div class="scale-chart-avg">Average: <strong>${average}</strong> / 5</div>
        <div class="scale-chart-bars">${bars}</div>
      </div>
    `;
  },

  // Render a priority matrix (urgency vs impact)
  renderPriorityMatrix(priorities) {
    const matrix = {
      highHigh: priorities.filter(p => p.urgency === 'high' && p.impact === 'high'),
      highMed: priorities.filter(p => p.urgency === 'high' && p.impact === 'medium'),
      medHigh: priorities.filter(p => p.urgency === 'medium' && p.impact === 'high'),
      medMed: priorities.filter(p => p.urgency === 'medium' && p.impact === 'medium'),
    };

    return `
      <div class="priority-matrix">
        <div class="matrix-axis-y">
          <span>High</span>
          <span class="axis-label">Urgency</span>
          <span>Med</span>
        </div>
        <div class="matrix-grid">
          <div class="matrix-cell critical">
            <div class="matrix-cell-label">Critical<br/><small>High Urgency × High Impact</small></div>
            <div class="matrix-cell-count">${matrix.highHigh.length}</div>
          </div>
          <div class="matrix-cell important">
            <div class="matrix-cell-label">Important<br/><small>High Urgency × Med Impact</small></div>
            <div class="matrix-cell-count">${matrix.highMed.length}</div>
          </div>
          <div class="matrix-cell strategic">
            <div class="matrix-cell-label">Strategic<br/><small>Med Urgency × High Impact</small></div>
            <div class="matrix-cell-count">${matrix.medHigh.length}</div>
          </div>
          <div class="matrix-cell routine">
            <div class="matrix-cell-label">Routine<br/><small>Med Urgency × Med Impact</small></div>
            <div class="matrix-cell-count">${matrix.medMed.length}</div>
          </div>
        </div>
        <div class="matrix-axis-x">
          <span>Medium</span>
          <span class="axis-label">Impact</span>
          <span>High</span>
        </div>
      </div>
    `;
  }
};
