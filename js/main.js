var _canvas = document.getElementsByTagName("canvas")[0];
var _context = _canvas.getContext("2d");
_context.fillStyle = "#ffffff"; // Something funky about white pixels
_context.fillRect(0, 0, 79, 52);

var _image = document.createElement("img");
_image.style.opacity = 0;
_image.src = "img/_logo.png";
_image.onload = () => {
    //_context.drawImage(_image, 0, 0, 79, 52);
}

document.body.appendChild(_image);

function leadingZeroes (n) {
    while (n.length < 8) { n = "0" + n; }
    return n;
}

function invert () {
    var imgData = _context.getImageData(0, 0, 79, 52);
    for (var i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] ^= 255;
        imgData.data[i + 1] ^= 255;
        imgData.data[i + 2] ^= 255;
    }
    _context.putImageData(imgData, 0, 0);
}

function inject () {
    var message = "Hello, world.\n";
    var bmp = createImageBitmap(_canvas).then(r => {
        console.log(r);
    });
}

function inject_0 () {
    var message = "Hello, world.\n";
    var messageBytes = [];

    for (var i = 0; i < message.length; i++) {
        messageBytes.push(leadingZeroes(message.charCodeAt(i).toString(2)));
    }

    var messageBits = [];

    messageBytes.forEach(b => {
        for (var i = 0; i < b.length; i++) {
            messageBits.push(parseInt(b[i], 2));
        }
    });

    console.log(messageBits.join(""));

    var imgData = _context.getImageData(0, 0, 79, 52);
    var oldData = imgData.data.slice();
    
    
    var binaryMessage1 = "";

    
    // for (var i = 0; i < messageBits.length * 4; i += 4) {
    //     binaryMessage1 += imgData.data[i + 0] & 1;
    //     binaryMessage1 += imgData.data[i + 1] & 1;
    //     binaryMessage1 += imgData.data[i + 2] & 1;
    // }

    var j = 0;
    for (var i = 0; i < messageBits.length; i++) {
        binaryMessage1 += (imgData.data[j] & 1 ) >>> 0;
        
        j++;
    }

    j = 0;
    for (var i = 0; i < messageBits.length; i++) {
        if (messageBits[i] === 1) {
            imgData.data[j] = (imgData.data[j] | 1) >>> 0;
        }
        else {
            imgData.data[j] = (imgData.data[j] & (~1 >>> 0)) >>> 0;
        }
        
        j++;
    }

    // for (var i = 0; i < imgData.data.length; i += 4) {

    //     if (j >= messageBits.length) continue;
    //     if (messageBits[j++] === 1)
    //         imgData.data[i] |= 1;
    //     else 
    //         imgData.data[i] &= ~1;

    //     if (j >= messageBits.length) continue;
    //     if (messageBits[j++] === 1)
    //         imgData.data[i + 1] |= 1;
    //     else 
    //         imgData.data[i + 1] &= ~1;
            
    //     if (j >= messageBits.length) continue;
    //     if (messageBits[j++] === 1)
    //         imgData.data[i + 2] |= 1;
    //     else 
    //         imgData.data[i + 2] &= ~1;
    // }

    var changesCount = 0;
    for (var i = 0; i < imgData.data.length; i++) {
        if (imgData.data[i] !== oldData[i]) changesCount++;
    }

    console.log(imgData.data.length + " " + changesCount);

    var binaryMessage = "";

    // for (var i = 0; i < messageBits.length * 4; i += 4) {
    //     binaryMessage += imgData.data[i + 0] & 1;
    //     binaryMessage += imgData.data[i + 1] & 1;
    //     binaryMessage += imgData.data[i + 2] & 1;
    // }

    j = 0;
    for (var i = 0; i < messageBits.length; i++) {
        binaryMessage += (imgData.data[j] & 1) >>> 0;
        
        j++;
    }

    console.log(binaryMessage1);
    console.log(binaryMessage);

    console.log("Current: " + _context.getImageData(0, 0, 79, 52).data.length + "\n" + _context.getImageData(0, 0, 79, 52).data[1]);
    console.log("Putting: " + imgData.data.length + "\n" + imgData.data[1]);
    //_context.putImageData(imgData, 0, 0);
    var bmp = createImageBitmap(imgData, 0, 0, 79, 52);
    _context.drawImage(bmp, 0, 0, 79, 52);
    console.log("Resutls: " + _context.getImageData(0, 0, 79, 52).data.length + "\n" + _context.getImageData(0, 0, 79, 52).data[1]);

    var arr = [];
    for (var i = 0; i < binaryMessage.length; i += 8) {
        arr.push(String.fromCharCode(parseInt(binaryMessage.substr(i, 8), 2)));
    }

    console.log(arr.join(""));
}

function extract () {
    var imgData2 = _context.getImageData(0, 0, 79, 52);

    var binaryMessage2 = "";
    
    for (var i = 0; i < imgData2.data.length; i += 4) {
        binaryMessage2 += (imgData2.data[i + 0] & 1) >>> 0;
        binaryMessage2 += (imgData2.data[i + 1] & 1) >>> 0;
        binaryMessage2 += (imgData2.data[i + 2] & 1) >>> 0;
        binaryMessage2 += (imgData2.data[i + 3] & 1) >>> 0;
    }
    console.log(binaryMessage2);

    var arr = [];
    for (var i = 0; i < binaryMessage2.length; i += 8) {
        arr.push(String.fromCharCode(parseInt(binaryMessage2.substr(i, 8), 2)));
    }

    console.log(arr.join(""));
}