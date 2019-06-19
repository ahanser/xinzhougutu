define(["dojo/_base/declare", "dojo/_base/lang", "esri/config", "esri/layers/BaseTileLayer", "esri/request"],
    function (declare, lang, esriConfig, BaseTileLayer, esriRequest) {
        return BaseTileLayer.createSubclass({
            properties: {
                urlTemplate: null
            },
            getTileUrl: function (level, row, col) {
                var url = "http://t" + col % 8 + ".tianditu.gov.cn/DataServer?T=vec_w&tk=4496625d338e0c78e8d76d097b2293aa&x=" + col + "&y=" + row + "&l=" + level;
                return url;
            },
            fetchTile: function (level, row, col) {
                var url = this.getTileUrl(level, row, col);
                return esriRequest(url, {
                    responseType: "image"
                })
                    .then(function (response) {

                        var image = response.data;
                        var width = this.tileInfo.size[0];
                        var height = this.tileInfo.size[0];

                        var canvas = document.createElement("canvas");
                        var context = canvas.getContext("2d");
                        canvas.width = width;
                        canvas.height = height;

                        context.drawImage(image, 0, 0, width, height);

                        return canvas;
                    }.bind(this));
            }
        });
    }
)