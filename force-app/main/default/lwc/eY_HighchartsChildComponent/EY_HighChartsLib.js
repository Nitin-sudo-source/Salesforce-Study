export const barChartConfig = {
  /* chart type*/
  chart: {
    type: 'column'
  },
  title: {
    text: 'Public cloud adoption 2019 vs. 2018'
  },
  xAxis: {
    title: {
      text: 'Cloud Providers'
    },
    categories: ['AWS', 'Azure', 'Google', 'IBM', 'Oracle']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Cloud adoption'
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        color: 'gray'
      }
    }
  },
  legend: {
    align: 'right',
    x: -30,
    verticalAlign: 'top',
    y: 25,
    floating: true,
    backgroundColor: 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
  },
  tooltip: {
    pointFormat: 'Year {series.name}: {point.y} %'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true
      }
    }
  },
  series: [{
    name: '2018',
    data: [59, 43, 15, 10, 5]
  }, {
    name: '2019',
    data: [68, 58, 19, 15, 10]
  }]
}

export const pieChartConfig = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Browser market shares in January, 2018'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
      name: 'Chrome',
      y: 61.41,
      sliced: true,
      selected: true
    }, {
      name: 'Internet Explorer',
      y: 11.84
    }, {
      name: 'Firefox',
      y: 10.85
    }, {
      name: 'Edge',
      y: 4.67
    }, {
      name: 'Safari',
      y: 4.18
    }, {
      name: 'Other',
      y: 7.05
    }]
  }]
}

export const donutConfigData = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: 'Contents of Highs ofts weekly fruit delivery'
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [{
    name: 'Delivered amount',
    data: [
      ['Bananas', 8],
      ['Kiwi', 3],
      ['Mixed nuts', 1],
      ['Oranges', 6],
      ['Apples', 8],
      ['Pears', 4],
      ['Clementines', 4],
      ['Reddish (bag)', 1],
      ['Grapes (bunch)', 1]
    ]
  }]
}