
import Chart from 'react-apexcharts'

const Charts = () => {

	const chartSeries = [
		{
			name: 'Clean Code',
			data: [2, 10, 5, 20, 40]
		},
		{
			name: 'Clean Architeture',
			data: [1, 11, 15, 26, 38]
		},
		{
			name: 'Patterns of Enterprise Application Architecture',
			data: [2, 30, 25, 21, 26]
		},
	]

	const chartOptions = {
		chart: {
			type: 'line',
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth'
		},
		title: {
			text: 'Most Purchased Products',
			align: 'left'
		},
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
	}

	return (
		<Chart 
			type='line'
			width='100%'
			height='450'
			series={chartSeries}
			options={chartOptions}
		/>
	)
}

export default Charts