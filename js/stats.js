export function chartData(ctx, maladeEvolution, days, newMalade, dead) {
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: days,
			datasets: [{
					label: 'contaminés total',
					data: maladeEvolution,
					borderWidth: 1
				},

				{
					label: 'nouveaux contaminés',
					data: newMalade,
					borderWidth: 1
				},

				{
					label: 'morts',
					data: dead,
					borderWidth: 1
				},
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'Contamination evolution'
				}
			}
		}
	});
}



export function eventData(ctx, eventName, eventNb) {
	new Chart(ctx, {
		type: 'pie',
		data: {
			labels: eventName,
			datasets: [{
				label: 'events',
				data: eventNb,
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(54, 162, 235)',
					'rgb(255, 205, 86)',
					'rgb(75, 192, 192)',
					'rgb(153, 102, 255)'

				],
				hoverOffset: 4
			}, ]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,

			plugins: {
				title: {
					display: true,
					text: 'Event Type Repartition'
				}
			}
		}
	});
}


/* export function surpriseData(ctx, roundNumber, playerNumber, successNumber) {
	new Chart(ctx, {
	  type: 'bar',
	  data: {
		labels: roundNumber,
		datasets: [{
		  label: 'uniformNumber',
		  data: playerNumber,
		},
	
		{
			label: 'geoNumber',
			data: successNumber,
		  }]
	  },
	  options: {
		scales: {
		  y: {
			beginAtZero: true
		  }
		},
		responsive : true,
	  }
	});
  }*/


export function surpriseData(ctx, roundNumber, playerNumber, successNumber, addSickNb) {
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: roundNumber,
			datasets: [{
					label: 'uniformNumber',
					data: playerNumber,
					
				},

				{
					label: 'geoNumber',
					data: successNumber,
				
				},
				{
					label: 'addSick',
					data: addSickNb,
				
				}
			]
		},
		options: {
			scales: {
				
			},
			responsive: true,
			interaction: {
				intersect: false,
			},

			plugins: {
				title: {
					display: true,
					text: 'Surprise data outcome'
				}
			}
		}
	});
}


export function immuData(ctx, days, immuCount) {
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: days,
			datasets: [{
					label: "immunity time",
					data:  immuCount,
					borderWidth: 1
				},
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,

			plugins: {
				title: {
					display: true,
					text: 'Immunity time'
				}
			}
		}
	});
}


export function guerisonData(ctx, guerisonName, healedNb, choiceNb) {
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: guerisonName,
			datasets: [{
				label: 'healed people',
				data:  healedNb,
				
			},

			{
				label: 'chosen number',
				data: choiceNb,
			
			},
			
		]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,

			plugins: {
				title: {
					display: true,
					text: 'Guerison success rates'
				}
			}
		}
	});
}


export function aleaData(ctx, aleaRoundNb, deaths) {
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: aleaRoundNb,
			datasets: [{
				label: 'new dead',
				data:  deaths,
				
			},
			
		]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,

			plugins: {
				title: {
					display: true,
					text: 'Alea deaths'
				}
			}
		}
	});
}



export function depistageData(ctx, depistageName, contaminationNb, choiceNb) {
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: depistageName,
			datasets: [{
				label: 'contaminated people',
				data:  contaminationNb,
				
			},

			{
				label: 'chosen number',
				data: choiceNb,
			
			},
		]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			},
			responsive: true,

			plugins: {
				title: {
					display: true,
					text: 'Despitage contamination'
				}
			}
		}
	});
}
