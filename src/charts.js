import Chart, { Colors } from "chart.js/auto";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
Chart.defaults.borderColor = "#172554";
Chart.defaults.color = "#60a5fa";

export const addTemperatureLineChart = (errorNeg, errorZero, errorPos) => {
    const datasets = {
      labels: Array.from({ length: 9 }, (_, i) => i-4), 
      datasets: [
        {
          label: 'Error Negative',
          data: Array.from({length: 9}, (_, i) => errorNeg.calculate(i-4)),
          fill: false,
          backgroundColor: '#f87171',
          borderColor: '#f87171',
        },
        {
          label: 'Error Zero',
          data: Array.from({length: 9}, (_, i) => errorZero.calculate(i-4)),
          fill: false,
          backgroundColor: '#e2e8f0',
          borderColor: '#e2e8f0',
        },
        {
          label: 'Error Positive',
          data: Array.from({length: 9}, (_, i) => errorPos.calculate(i-4)),
          fill: false,
          backgroundColor: '#4ade80',
          borderColor: '#4ade80',
        },
      ]
    };
  
    return new Chart(
      document.getElementById('temperatureChart'),
      {
        type: 'line',
        data: datasets,
        options: {
          radius: 0,
          layout: {
            padding: 0
          },
          scales: {
            x: {
              min: -4,
              max: 4,
              grid: {
                color: "rgba(0, 0, 0, 0)",
              }
            },
            y: {
              min: 0,
              max: 1.0,
              ticks: {
                stepSize: .1
              },
              grid: {
                color: "rgba(0, 0, 0, 0)",
              }
            },
          },
          responsive: true, 
          interaction: {
            mode: "x"
          },
          plugins: {

            title: {
              display: true,
              text: 'Error',
              font: {
                family: "Helvetica",
              }
            },
            annotation: {
              annotations: [{
                type: "line",
                xMin: 1,
                xMax: 1,
                yMin: 0,
                yMax: 1,
                borderColor: "#4ade80",
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  enabled: true,
                  content: "Test"
                },
              }]
            }
        },
      },
      },
    );
  }


export const addTemperatureBarChart = (data) => {

  const datasets = {
    labels: ["F", "C", "W"],
    datasets: [{
      data: data,
      borderColor: ["#3b82f6", "#67e8f9", "#fef08a"],
      borderWidth: 3,
    }]
  };

  return new Chart(
    document.getElementById("temperatureBarChart"),
    {
      type: "bar",
      data: datasets,
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 4,
          }
        },
        scales: {
          x: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Temperature Fuzzy Logic"
          }
        }
      }
    })
}

export const addCloudCoverChart = (sunnyMf, partlyCloudyMf, overcastMf) => {
  const datasets = {
    labels: Array.from({ length: 20 }, (_, i) => i-10), 
    datasets: [
      {
        label: 'Error-Dot Negative',
        data: Array.from({length: 20}, (_, i) => sunnyMf.calculate(i-10)),
        fill: false,
        backgroundColor: '#fcd34d',
        borderColor: '#fcd34d',
      },
      {
        label: 'Error-Dot Zero',
        data: Array.from({length: 20}, (_, i) => partlyCloudyMf.calculate(i-10)),
        fill: false,
        backgroundColor: '#fdba74',
        borderColor: '#fdba74',
      },
      {
        label: 'Error-Dot Positive',
        data: Array.from({length: 20}, (_, i) => overcastMf.calculate(i-10)),
        fill: false,
        backgroundColor: '#0e7490',
        borderColor: '#0e7490',
      },
    ]
  };

  return new Chart(
    document.getElementById('cloudCoverChart'),
    {
      type: 'line',
      data: datasets,
      options: {
        radius: 0,
        layout: {
          padding: 0
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0)",
            }
          },
          y: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
            grid: {
              color: "rgba(0, 0, 0, 0)",
            }
          },
        },
        responsive: true, 
        interaction: {
          mode: "x"
        },
        plugins: {

          title: {
            display: true,
            text: 'Error Dot',
            font: {
              family: "Helvetica",
            }
          },
          annotation: {
            annotations: [{
              type: "line",
              xMin: 1,
              xMax: 1,
              yMin: 0,
              yMax: 1,
              borderColor: "#4ade80",
              borderWidth: 2,
              borderDash: [10, 10],
              label: {
                enabled: true,
                content: "Test"
              },
            }]
          }
      },
    },
    },
  );
}

export const addCloudCoverBarChart = (data) => {

  const datasets = {
    labels: ["S", "PC", "O"],
    datasets: [{
      data: data,
      borderColor: ["#fcd34d", "#fdba74", "#0e7490"],
      borderWidth: 3,
    }]
  };

  return new Chart(
    document.getElementById("cloudCoverBarChart"),
    {
      type: "bar",
      data: datasets,
      options: {
        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 4,
          }
        },
        scales: {
          x: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Cloud Cover Fuzzy Logic"
          }
        }
      }
    })
}

export const addSpeedChart = (cooler, noChange, heater) => {
  const datasets = {
    labels: Array.from({ length: 201 }, (_, i) => `${i-100}%`), 
    datasets: [
      {
        label: 'Cooler',
        data: Array.from({length: 201}, (_, i) => cooler.calculate(i-100)),
        fill: false,
        backgroundColor: '#7dd3fc',
        borderColor: '#7dd3fc',
        order: 2,
      },
      {
        label: 'No Change',
        data: Array.from({length: 201}, (_, i) => noChange.calculate(i-100)),
        fill: false,
        backgroundColor: '#d6d3d1',
        borderColor: '#d6d3d1',
        order: 2,
      },
      {
        label: 'Heater',
        data: Array.from({length: 201}, (_, i) => heater.calculate(i-100)),
        fill: false,
        backgroundColor: '#facc15',
        borderColor: '#facc15',
        order: 2,
      },
    ]
  };

  return new Chart(
    document.getElementById('speedChart'),
    {
      type: 'line',
      data: datasets,
      options: {
        radius: 0,
        layout: {
          padding: 0
        },
        scales: {
          y: {
            min: 0,
            max: 1.0,
            ticks: {
              stepSize: .1
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0)"
            },
          }
        },
        responsive: true, 
        interaction: {
          mode: "x"
        },
        plugins: {
          title: {
            display: true,
            text: 'Output Type',
            font: {
              size: 24,
              family: "Helvetica",
            }
          },
      },
    },
    },
  );
}
