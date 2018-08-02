var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.setUpCamera();
        setInterval(this.takePhoto, 5000);
    },

    takePhoto: function () {
        CameraPreview.takePicture(function (base64PictureData) {
            setRandomFilter();
            myphoto.src = 'data:image/jpeg;base64,' + base64PictureData;
        });
    },

    setUpCamera: function () {
        let options = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: CameraPreview.CAMERA_DIRECTION.BACK,
            toBack: true,
            tapPhoto: false,
            tapFocus: false,
            previewDrag: false
        };

        CameraPreview.startCamera(options);
    },

    toggleCamera: function(){
        CameraPreview.switchCamera();
    }

};

const myphoto = document.querySelector('#myphoto');
const front = document.querySelector('#front');
const back = document.querySelector('#back');
front.onclick = showBack;
back.onclick = showFront
myphoto.width = window.screen.width;
myphoto.height = window.screen.height;
app.initialize();

const filters = ['grayscale', 'sepia', 'saturate', 'hue-rotate', 'invert', 'brightness', 'contrast', 'blur', 'tint', 'multi'];

function setRandomFilter() {
    try {
        let filter = filters[Math.floor(Math.random() * filters.length)];
        switch (filter) {
            case 'grayscale':
            case 'sepia':
            case 'invert':
                document.documentElement.style.setProperty('--myfilter', `${filter}(${Math.random()})`);
                break;
            case 'hue-rotate':
                document.documentElement.style.setProperty('--myfilter', `${filter}(${getRandomInt(360, 30)}deg)`);
                break;
            case 'saturate':
            case 'brightness':
            case 'contrast':
                document.documentElement.style.setProperty('--myfilter', `${filter}(${getRandomDouble(8, 2)})`);
                break;
            case 'blur':
                document.documentElement.style.setProperty('--myfilter', `${filter}(${getRandomInt(10, 2)}px)`);
                break;
            case 'tint':
                document.documentElement.style.setProperty('--myfilter', `sepia(${Math.random()}) hue-rotate(${getRandomInt(360, 30)}deg)`);
                break;
            case 'multi':
                document.documentElement.style.setProperty('--myfilter', `contrast(${getRandomDouble(8, 2)}) saturate(${getRandomDouble(8, 2)}) sepia(${Math.random()});`);
                break;
        }
    } catch (err) {
        alert(err);
    }

}

function getRandomInt(max, min) {
    max -= min;
    return (Math.floor(Math.random() * Math.floor(max))) + min;
}

function getRandomDouble(max, min) {
    max -= min;
    return (Math.random() * Math.floor(max)) + min;
}

function showBack(){
    app.toggleCamera();
    front.style.display = "none";
    back.style.display = "initial";
}

function showFront(){
    app.toggleCamera();
    front.style.display = "initial";
    back.style.display = "none";
}