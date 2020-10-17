
window.addEventListener('DOMContentLoaded', () => {

    // Multiple 
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let type = connection.effectiveType;

    console.log('connection', connection);

    const data = document.querySelector('#data');
    const output = document.querySelector('#output');

    if (connection && data && output) {
        function updateConnectionStatus() {
            output.textContent = `Connection type changed from ${type} to ${connection.effectiveType}`;
            type = connection.effectiveType;
            data.textContent = `Downlink: ${connection.downlink} || Effective Type: ${connection.effectiveType} || RTT: ${connection.rtt}`;
        }
    
        connection.addEventListener('change', updateConnectionStatus);
    
        data.textContent = `Downlink: ${connection.downlink} || Effective Type: ${connection.effectiveType} || RTT: ${connection.rtt}`;
    }
});