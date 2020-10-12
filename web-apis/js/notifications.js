
window.addEventListener('DOMContentLoaded', () => {
    const buttonEnable = document.querySelector('#buttonEnable');
    const buttonSend = document.querySelector('#buttonSend');

    if (buttonEnable) {
        buttonEnable.addEventListener('click', () => {
            Notification.requestPermission().then(result => console.log(result));
        });
    }

    if (buttonSend) {
        buttonSend.addEventListener('click', () => {
            const icon = '../../assets/icons/the-can-store/bean_can.png';
            const text = 'Your task is done!';
            const notification = new Notification('New message!', { body: text, icon: icon });
    
            setTimeout(() => notification.close(), 5000);
        });
    }
});