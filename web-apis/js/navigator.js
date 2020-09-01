
window.addEventListener('DOMContentLoaded', () => {

    console.log('navigator', navigator);

    const propertiesOutput = document.querySelector('#propertiesOutput');

    getProperties(propertiesOutput);
});

function getProperties(output) {
    output.innerHTML += 
    `
        <p><b> Build ID: </b> ${navigator.buildID ? navigator.buildID : 'Not supported by your browser!'}</p> <!-- firefox only -->
        <p><b> App Code Name: </b> ${navigator.appCodeName}</p>
        <p><b> App Name: </b> ${navigator.appName}</p>
        <p><b> App Version: </b> ${navigator.appVersion}</p>
        <p><b> Cookies enabled ? </b> ${navigator.cookieEnabled ? 'Yes' : 'No'}</p>
        <p><b> Dot Not Track enabled ? </b> ${navigator.doNotTrack ? 'Yes' : 'No'}</p>
        <p><b> Number of Logical Processor Cores Available: </b> ${navigator.hardwareConcurrency}</p>
        <p><b> Is Java Enabled ? </b> ${navigator.javaEnabled() ? 'Yes' : 'No'}</p>
        <p><b> Language: </b> ${navigator.language}</p>
        <p><b> Languages: </b> ${navigator.languages.join(' , ')}</p>
        <p><b> Max Touch Points: </b> ${navigator.maxTouchPoints}</p>
        <p><b> Is Online ? </b> ${navigator.onLine ? 'Yes' : 'No'}</p>
        <p><b> Is Pointer Enabled ? </b> ${navigator.pointerEnabled ? 'Yes' : 'No'}</p>
        <p><b> User Agent: </b> ${navigator.userAgent}</p>
        <p><b> Vendor: </b> ${navigator.vendor}</p>
        <p><b> Vendor Sub: </b> ${navigator.vendorSub}</p>
        <p><b> Is Webdriver ? </b> ${navigator.webdriver ? 'Yes' : 'No'}</p>
        <p><b> Security Policy: </b> ${navigator.securitypolicy ? navigator.securitypolicy : 'Not supported by your browser!'}</p>
        <p><b> Standalone mode? </b> ${navigator.standalone ? navigator.standalone : 'Not supported by your browser!'}</p> <!-- iOS Safari -->
        <p><b> Operating System: </b> ${navigator.oscpu ? navigator.oscpu : 'Not supported by your browser!'}</p> <!-- Deprecated -->
        <p><b> Platform: </b> ${navigator.platform ? navigator.platform : 'Not supported by your browser!'}</p> <!-- Deprecated -->
        <p><b> Product: </b> ${navigator.product ? navigator.product : 'Not supported by your browser!'}</p> <!-- Deprecated -->
        <p><b> Product Sub: </b> ${navigator.productSub ? navigator.productSub : 'Not supported by your browser!'}</p> <!-- Deprecated -->
        <p><b> Vendor Sub: </b> ${navigator.vendorSub ? navigator.vendorSub : 'Not supported by your browser!'}</p> <!-- Deprecated -->
    `;

    getKeyboardProperties(output);
    
}

function getKeyboardProperties(output) {
    if (navigator.keyboard) {
        const promise = navigator.keyboard.getLayoutMap();
        promise.then(layout => {
            console.log('layout', layout);

            output.innerHTML += `<hr/>`;
            output.innerHTML += `<p> Keyboard values: </p>`;
            let content = '<ul>';
            const keys = layout.keys();
            for (const key of keys) {
                const value = layout.get(key);
                content += `<li> ${key} | ${value} </li>`;
            }
            content += `</ul>`;
            output.innerHTML += content;

            getMimeTypes(output);
        })
        .catch(error => {
            console.log('error', error);
            output.innerHTML += `<p> Error on getting keyboard property of navigator: ${error} </p>`;
            getMimeTypes(output);
        });
    }
    else {
        output.innerHTML += `<p> Your browser doesn't support keyboard property of navigator </p>`;
        getMimeTypes(output);
    }
}

function getMimeTypes(output) {
    if (navigator.mimeTypes) {
        if (navigator.mimeTypes.length !== 0) {
            output.innerHTML += `<hr/><p> Mime Types: </p>`

            for (const mime of navigator.mimeTypes) {
                console.log('mime', mime);
                output.innerHTML += 
                `
                <div class="mime">
                    <p><b> Type: </b> ${mime.type} </p>
                    <p><b> Suffixes: </b> ${mime.suffixes} </p>
                    <p><b> Description: </b> ${mime.description} </p>
                </div>
                `;
            }
            
        }
        else {
            output.innerHTML += `<p> None mime type found! </p>`;
        }
    }
    else {
        output.innerHTML += `<p> Your browser doesn't support mime types property of navigator </p>`;
    }
}
