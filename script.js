document.addEventListener('DOMContentLoaded', function() {
    // Dummy data (replace this with actual data from your detection system)
    var totalImages = 100;
    var damagedImages = 30;

    // Calculate percentage of road damage
    var damagePercentage = (damagedImages / totalImages) * 100;

    // Update details on the page
    document.getElementById('totalImages').innerText = totalImages;
    document.getElementById('damagePercentage').innerText = damagePercentage.toFixed(2);

    // Create pie chart
    var ctx = document.getElementById('damageChart').getContext('2d');
    var damageChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Undamaged', 'Damaged'],
            datasets: [{
                label: 'Road Damage',
                data: [totalImages - damagedImages, damagedImages],
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom'
            }
        }
    });
});
