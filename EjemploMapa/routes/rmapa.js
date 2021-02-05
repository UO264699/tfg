module.exports = function (app,gestorBD) {
    app.get("/", function (req, res) {

        res.render("mapa");

    }),

        app.post("/", function (req, res) {

           let punto = {
               "type": "Feature",
               "geometry": {
                   "type": "Point",
                   "coordinates": [parseFloat(req.body.latitud), parseFloat(req.body.longitud)]
               },
           }

            gestorBD.guardarPunto(punto, function (id) {
                if (id == null) {
                    res.send("Error al guardar punto");
                } else {
                    res.redirect("/");
                }
            });

        });

}