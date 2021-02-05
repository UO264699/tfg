module.exports = {
    mongo : null,
    app : null,
    init : function(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    },

guardarPunto: function(punto, funcionCallback) {
    this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
        if (err) {
            funcionCallback(null);
        } else {
            let collection = db.collection('puntos');
            collection.insert(punto, function (err, result) {
                if (err) {
                    funcionCallback(null);
                } else {
                    funcionCallback(result.ops[0]._id);
                }
                db.close();
            });
        }
    })

},
    obtenerPuntos : function(criterio,funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                let collection = db.collection('puntos');
                collection.find(criterio).toArray(function(err, puntos) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(puntos);
                    }
                    db.close();
                });
            }
        });
    },


}