import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const mupdf = require("mupdf");
mupdf.ready.then(function () {
//    var input = fs.readFileSync("my_document.pdf");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://tech-center-test.oss-cn-chengdu.aliyuncs.com/test/1_150M%E6%96%87%E4%BB%B62023%E3%80%8A%E7%BA%A2%E5%AE%9D%E4%B9%A6%E8%80%83%E7%A0%94%E8%8B%B1%E8%AF%AD%E8%AF%8D%E6%B1%87%E3%80%8B-1~300%20(1)%20-%20%E5%89%AF%E6%9C%AC.pdf");
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
        if (this.status === 200) {
            var blob = new Blob([xhr.response], {type: "application/pdf"});
            var start = new Date();
            
            blob.arrayBuffer().then(arrayBuffer => {
                console.log(arrayBuffer)
                
                var doc = mupdf.Document.openDocument(arrayBuffer, "application/pdf");
                var end = new Date();
                console.log(end)
                console.log(doc.countPages());
                
                var root = document.getElementById('app');
                for(var i=0; i<doc.countPages()-200;i++){
                    const png = doc.loadPage(i).toPixmap(mupdf.Matrix.identity, mupdf.ColorSpace.DeviceRGB, true, true).asPNG();
                    var ele = document.createElement("img");
                    ele.src = URL.createObjectURL(
                        new Blob([png], { type: 'image/png' } /* (1) */)
                        );
                        
                        root.appendChild(ele); 
                    }
                    end = new Date();
                    console.log(start)
                    console.log(end)
            });

            
            // var objectUrl = URL.createObjectURL(blob);
            // window.open(objectUrl);
        }
    };
    xhr.send();
})